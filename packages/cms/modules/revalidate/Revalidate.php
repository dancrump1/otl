<?php

namespace modules\revalidate;

use Craft;
use craft\elements\Category;
use craft\elements\Entry;
use yii\base\Module as BaseModule;
use craft\services\Elements;
use yii\base\Event;
use craft\queue\BaseJob;
use GuzzleHttp\Client;
use craft\helpers\App;
use craft\events\MoveElementEvent;
use craft\services\Structures;
use verbb\navigation\elements\Node;
use craft\events\ModelEvent;

/**
 * Revalidate module
 *
 * @method static Revalidate getInstance()
 */
class Revalidate extends BaseModule
{
    public function init()
    {
        parent::init();
        // EVENT_AFTER_SAVE_ELEMENT
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_SAVE_ELEMENT,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else 
                if (
                    $element instanceof Entry &&
                    !$element->getIsDraft() &&
                    !$element->getIsRevision() &&
                    !$element->propagating &&
                    $element->getIsCanonical()
                ) {
                    $this->handleAfterSave($event);
                }
            }
        );

        // EVENT_AFTER_DELETE_ELEMENT
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_DELETE_ELEMENT,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else 
                if (
                    $element instanceof Entry &&
                    !$element->getIsDraft() &&
                    !$element->getIsRevision() &&
                    !$element->propagating &&
                    $element->getIsCanonical()
                ) {
                    $this->handleAfterSave($event);
                }
            }
        );
        // EVENT_AFTER_RESAVE_ELEMENT
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_RESAVE_ELEMENT,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else 
                if (
                    $element instanceof Entry &&
                    !$element->getIsDraft() &&
                    !$element->getIsRevision() &&
                    !$element->propagating &&
                    $element->getIsCanonical()
                ) {
                    $this->handleAfterSave($event);
                }
            }
        );
        // EVENT_AFTER_RESTORE_ELEMENT
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_RESTORE_ELEMENT,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else 
                if (
                    $element instanceof Entry &&
                    !$element->getIsDraft() &&
                    !$element->getIsRevision() &&
                    !$element->propagating &&
                    $element->getIsCanonical()
                ) {
                    $this->handleAfterSave($event);
                }
            }
        );
        // EVENT_AFTER_UPDATE_SLUG_AND_URI
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_UPDATE_SLUG_AND_URI,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else 
                if (
                    $element instanceof Entry &&
                    !$element->getIsDraft() &&
                    !$element->getIsRevision() &&
                    !$element->propagating &&
                    $element->getIsCanonical()
                ) {
                    $this->handleAfterSave($event);
                }
            }
        );

        // EVENT_AFTER_MOVE_ELEMENT
        Event::on(Structures::class, Structures::EVENT_AFTER_MOVE_ELEMENT, function (MoveElementEvent $event) {

            $this->revalidateAllPages();
        });

        // EVENT_AFTER_SAVE
        Event::on(Node::class, Node::EVENT_AFTER_SAVE, function (ModelEvent $event) {

            $this->revalidateAllPages();
        });
    }

    protected function handleAfterSave(Event $event)
    {
        $element = $event->element;

        // Check if the element is not a draft or revision and if it has a URI
        if (!$element->getIsDraft() && !$element->getIsRevision() && $element->uri !== null && !($element instanceof Category)) {
            // Push a job to the queue to handle revalidation asynchronously
            Craft::$app->queue->push(new RevalidateJob([
                'uri' => $element->uri,
            ]));

            Craft::$app->queue->push(new RevalidateJob([
                'uri' => 'sitemap.xml',
            ]));
        };

        if ($element instanceof \craft\elements\GlobalSet || $element instanceof Category) {
            $this->revalidateAllPages();
        };
    }

    public function revalidateAllPages()
    {
        // TODO: How to get all structures
        $contentPages = Entry::find()
            ->section('contentPages')
            ->all();

        Craft::$app->queue->push(new RevalidateJob([
            'uri' => '__home__',
        ]));
        Craft::$app->queue->push(new RevalidateJob([
            'uri' => 'sitemap.xml',
        ]));

        foreach ($contentPages as $page) {
            Craft::$app->queue->push(new RevalidateJob([
                'uri' => $page->uri,
            ]));
        }
    }
}


// Define the queue job class
class RevalidateJob extends BaseJob
{
    public $uri;
    // Ensure the method signature matches the interface
    public function execute($queue): void
    {
        $client = new Client();
        $url = App::env('UI_BASE_URL') . '/api/revalidate?uri=';

        $url .= urlencode($this->uri);
        // TODO create variable 
        $url .= '&secret=' . App::env('REVALIDATION_SECRET');

        try {
            $response = $client->post($url);
            if ($response->getStatusCode() === 200) {
                Craft::info('Next.js revalidation successful.', __METHOD__);
            } else {
                Craft::error('Next.js revalidation failed: ' . $response->getBody(), __METHOD__);
            }
        } catch (\Exception $e) {
            Craft::error('Next.js revalidation error: ' . $e->getMessage(), __METHOD__);
        }
    }
    protected function defaultDescription(): string
    {
        return 'Updating ' . $this->uri . ' page';
    }
}
