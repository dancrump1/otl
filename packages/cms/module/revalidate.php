<?php

namespace modules\revalidate;

use Craft;
use yii\base\Module as BaseModule;
use craft\services\Elements;
use yii\base\Event;
use craft\queue\BaseJob;
use GuzzleHttp\Client;
use craft\elements\Entry;
use craft\helpers\App;
use craft\events\MoveElementEvent;
use craft\services\Structures;
use verbb\navigation\elements\Node;
use craft\events\ModelEvent;

use GuzzleHttp\Promise;

/**
 * Revalidate module
 *
 * @method static Revalidate getInstance()
 * 
 * Revalidate single or all pages based on CMS interaction
 * 
 * Assumption: Verbb navigation plugin used to control navigation
 * Assumption: Event Calendar plugin
 */
class Revalidate extends BaseModule
{
    public function init()
    {
        parent::init();

        // SAVE_ELEMENT
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_SAVE_ELEMENT,
            function (Event $event) {
                $this->handleAfterSave($event);
            }
        );

        // SAVE NODE
        Event::on(Node::class, Node::EVENT_AFTER_SAVE, function (ModelEvent $event) {
            $this->revalidateAllPages();
        });

        // DELETE_ELEMENT
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_DELETE_ELEMENT,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else {
                    $this->handleAfterSave($event);
                }
            }
        );

        // RESAVE_ELEMENT
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_RESAVE_ELEMENT,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else {
                    $this->handleAfterSave($event);
                }
            }
        );

        // RESTORE_ELEMENT
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_RESTORE_ELEMENT,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else {
                    $this->handleAfterSave($event);
                }
            }
        );

        // UPDATE_SLUG_AND_URI
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_UPDATE_SLUG_AND_URI,
            function (Event $event) {
                $element = $event->element;

                if ($element instanceof Node) {
                    $this->revalidateAllPages();
                } else {
                    $this->handleAfterSave($event);
                }
            }
        );

        // MOVE_ELEMENT
        Event::on(Structures::class, Structures::EVENT_AFTER_MOVE_ELEMENT, function (MoveElementEvent $event) {
            $this->revalidateAllPages();
        });
    }

    // Find all CMS pages for the frontend and refresh their data
    public function revalidateAllPages()
    {
        $entries = Entry::find()
            ->section('contentPages')
            ->all();

        $articles = Entry::find()
            ->section('articles')
            ->all();

        // From Event Calendar
        $events = Entry::find()
            ->section('events')
            ->all();


        // EXAMPLE EXTRA CUSTOM SECTION
        // $history = Entry::find()
        //     ->section('history')
        //     ->one();

        // TODO: Create variables for other custom sections

        $allExtras = []; // Place to hold uris

        // Get uris from all of the sections
        foreach (
            array_merge(
                $entries,
                $articles,
                $events
            ) as $entry
        ) {
            $allExtras[] = $entry->uri;
        }

        // Push list of routes to job
        // Always include Home, Search, Sitemap pages
        Craft::$app->queue->push(new RevalidateJob(
            ['uri_strings' => array_merge(
                $allExtras,
                [
                    '__home__',
                ],
                [
                    'search',
                ],
                [
                    'sitemap.xml',
                ],
            )]
        ));
    }

    // Find one CMS page for the frontend and refresh its data
    protected function handleAfterSave(Event $event)
    {
        // Entry we are saving
        $element = $event->element;

        // Check if the element is not a draft or revision and if it has a URI
        if ($element instanceof \craft\elements\Entry && !$element->getIsDraft() && !$element->getIsRevision() && $element->uri !== null) {
            // Put entry in list of uris to revalidate
            $uri_strings = [$element->uri];

            // Always revalidate home
            $uri_strings[] = '__home__';

            // TODO: Include any circular-dependencies here (I.E. pages that pick up data from each other to display)

            // ---- START EXAMPLE CIRCULAR DEP -----
            //  $uri_strings[] = 'print-mountain-report';
            // If it is the trails and lifts page, update pages that use the data
            // if ($element->type == 'trailReportPage') {
            //     $uri_strings[] = Entry::find()->section('mountainReport')->one()->uri;
            // }

            // If it is the mountain report page, update pages that use the data
            // if ($element->type == 'mountainReportEntry') {
            //     $uri_strings[] = Entry::find()->section('trailsLifts')->one()->uri;
            // }
            // ---- END EXAMPLE CIRCULAR DEP -----

            // DO NOT MOVE:
            // Add sitemap to end of revalidation list
            $uri_strings[] = 'sitemap.xml';

            // Pass uri strings to single revalidation queue job
            Craft::$app->queue->push(new RevalidateJob(['uri_strings' => $uri_strings]));
        }
        // If saving global item, revalidate it all
        else if ($element instanceof \craft\elements\Category || $element instanceof \craft\elements\GlobalSet) {
            $this->revalidateAllPages();
        };
    }
}

// Custom Job for CMS
class RevalidateJob extends BaseJob
{
    /** @var string[] List of URIs to revalidate */
    public $uri_strings = [];

    public function execute($queue): void
    {
        if (empty($this->uri_strings)) {
            Craft::info('No URIs to revalidate.', __METHOD__);
            return;
        }

        $client = new Client();
        $urlBase = App::env('UI_BASE_URL') . '/api/revalidate?secret=' . App::env('NEXTJS_SECRET');

        $total = count($this->uri_strings);
        $resolvedCount = 0;

        // Fire all requests concurrently without batching
        $promises = [];
        foreach ($this->uri_strings as $uri) {
            $fullUrl = $urlBase . '&uri=' . urlencode($uri);

            $promises[$uri] = $client->postAsync($fullUrl)
                ->then(
                    function ($response) use ($uri, &$resolvedCount, $total, $queue) {
                        $resolvedCount++;
                        // Update Craft queue progress
                        $this->setProgress($queue, $resolvedCount / $total, "{$resolvedCount} of {$total} revalidated");

                        if ($response->getStatusCode() === 200) {
                            Craft::info("Success: {$uri}", __METHOD__);
                        } else {
                            Craft::error("Failed: {$uri} - " . $response->getBody(), __METHOD__);
                        }
                    },
                    function ($e) use ($uri, &$resolvedCount, $total, $queue) {
                        $resolvedCount++;
                        // Update Craft queue progress
                        $this->setProgress($queue, $resolvedCount / $total, "{$resolvedCount} of {$total} revalidated");
                        Craft::error("Error: {$uri} - " . $e->getMessage(), __METHOD__);
                    }
                );
        }

        // Wait for all requests to complete
        Promise\Utils::settle($promises)->wait();

        Craft::info('All revalidation requests completed.', __METHOD__);
    }

    protected function defaultDescription(): string
    {
        return "Saved! Updating website pages...";
    }
}
