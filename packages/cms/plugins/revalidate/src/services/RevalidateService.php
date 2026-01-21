<?php

namespace revalidate\services;

use Craft;
use craft\base\Component;
use craft\elements\Category;
use craft\elements\Entry;
use craft\services\Elements;
use craft\services\Sections;
use craft\services\Structures;
use craft\services\Plugins;
use craft\events\MoveElementEvent;
use craft\events\ModelEvent;
use verbb\navigation\elements\Node;
use yii\base\Event;
use revalidate\models\RevalidateItem;
use revalidate\records\RevalidateItem as RevalidateItemRecord;
use revalidate\queue\jobs\RevalidateJob;

/**
 * Revalidate Service
 */
class RevalidateService extends Component
{
    public function init(): void
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
                } elseif (
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
                } elseif (
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
                } elseif (
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
                } elseif (
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
                } elseif (
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

    protected function handleAfterSave(Event $event): void
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
        }

        if ($element instanceof \craft\elements\GlobalSet || $element instanceof Category) {
            $this->revalidateAllPages();
        }
    }

    public function revalidateAllPages(): void
    {
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

    /**
     * Get all available sections (channels, structures, singles)
     * Excludes admin guide section
     */
    public function getAvailableSections(): array
    {
        $result = [];
        
        try {
            // Try to get sections via project config
            $projectConfig = Craft::$app->getProjectConfig();
            $sections = $projectConfig->get('sections') ?? [];
            
            foreach ($sections as $uid => $sectionData) {
                if (isset($sectionData['handle']) && isset($sectionData['name'])) {
                    // Exclude admin guide
                    if (strtolower($sectionData['handle']) === 'adminguide' || 
                        stripos($sectionData['name'], 'admin guide') !== false) {
                        continue;
                    }
                    
                    $result[] = [
                        'handle' => $sectionData['handle'],
                        'name' => $sectionData['name'],
                        'type' => $sectionData['type'] ?? 'channel',
                    ];
                }
            }
        } catch (\Exception $e) {
            // Fallback: try to discover sections by querying entries
            // This is less reliable but works as a fallback
            Craft::warning('Could not get sections from project config: ' . $e->getMessage(), __METHOD__);
        }

        return $result;
    }

    /**
     * Get all available navigation menus
     */
    public function getAvailableNavigations(): array
    {
        $result = [];

        // First try to get from plugin if available
        if (class_exists('verbb\navigation\Navigation')) {
            try {
                $navigationPlugin = \verbb\navigation\Navigation::getInstance();
                
                // Check if plugin is installed and enabled
                if ($navigationPlugin && Craft::$app->plugins->isPluginInstalled('navigation') && Craft::$app->plugins->isPluginEnabled('navigation')) {
                    $navsService = $navigationPlugin->getNavs();
                    if ($navsService) {
                        $navs = $navsService->getAllNavs();
                        foreach ($navs as $nav) {
                            $result[] = [
                                'handle' => $nav->handle,
                                'name' => $nav->name,
                                'type' => 'navigation',
                            ];
                        }
                        return $result;
                    }
                }
            } catch (\Exception $e) {
                // Fall through to project config method
                Craft::info('Could not get navigation from plugin, trying project config: ' . $e->getMessage(), __METHOD__);
            }
        }

        // Fallback: try to get from project config
        try {
            $projectConfig = Craft::$app->getProjectConfig();
            $navs = $projectConfig->get('navigation.navs') ?? [];
            
            foreach ($navs as $uid => $navData) {
                if (isset($navData['handle']) && isset($navData['name'])) {
                    $result[] = [
                        'handle' => $navData['handle'],
                        'name' => $navData['name'],
                        'type' => 'navigation',
                    ];
                }
            }
        } catch (\Exception $e) {
            Craft::warning('Could not get navigation menus from project config: ' . $e->getMessage(), __METHOD__);
        }

        return $result;
    }

    /**
     * Get all content types (sections only, navigation excluded as it's handled automatically)
     */
    public function getAvailableContentTypes(): array
    {
        // Only return sections - navigation is handled automatically via events
        return $this->getAvailableSections();
    }

    /**
     * Get all manual revalidation items
     */
    public function getAllItems(): array
    {
        $records = RevalidateItemRecord::find()->all();
        $items = [];
        foreach ($records as $record) {
            $items[] = RevalidateItem::populateModel($record, null);
        }
        return $items;
    }

    /**
     * Get a revalidation item by ID
     */
    public function getItemById(int $id): ?RevalidateItem
    {
        $record = RevalidateItemRecord::findOne(['id' => $id]);
        return $record ? RevalidateItem::populateModel($record, null) : null;
    }

    /**
     * Save a revalidation item
     */
    public function saveItem(RevalidateItem $item): bool
    {
        return $item->save();
    }

    /**
     * Delete a revalidation item
     */
    public function deleteItem(RevalidateItem $item): bool
    {
        return $item->delete();
    }

    /**
     * Revalidate a specific URI
     */
    public function revalidateUri(string $uri): void
    {
        Craft::$app->queue->push(new RevalidateJob([
            'uri' => $uri,
        ]));
    }

    /**
     * Revalidate all items from a content type handle
     */
    public function revalidateByContentType(string $typeHandle, string $type = 'section'): void
    {
        if ($type === 'navigation') {
            // Revalidate all navigation items
            if (class_exists('verbb\navigation\elements\Node')) {
                $nodes = \verbb\navigation\elements\Node::find()
                    ->nav($typeHandle)
                    ->all();

                foreach ($nodes as $node) {
                    // Navigation changes typically trigger full revalidation
                    $this->revalidateAllPages();
                    return;
                }
            }
        } else {
            // Revalidate all entries from a section
            $entries = Entry::find()
                ->section($typeHandle)
                ->status(null)
                ->all();

            foreach ($entries as $entry) {
                if ($entry->uri !== null && !$entry->getIsDraft() && !$entry->getIsRevision()) {
                    $this->revalidateUri($entry->uri);
                }
            }

            // Also revalidate sitemap and home
            $this->revalidateUri('sitemap.xml');
            $this->revalidateUri('__home__');
        }
    }

    /**
     * Revalidate all manual items
     */
    public function revalidateAllManualItems(): void
    {
        $items = $this->getAllItems();
        foreach ($items as $item) {
            if ($item->type === 'uri') {
                // Direct URI revalidation
                $this->revalidateUri($item->contentHandle);
            } else {
                // Content type revalidation
                $this->revalidateByContentType($item->contentHandle, $item->type);
            }
        }
    }

    /**
     * Get entries for a specific section handle
     */
    public function getEntriesForSection(string $sectionHandle): array
    {
        $entries = Entry::find()
            ->section($sectionHandle)
            ->status(null)
            ->all();

        $result = [];
        foreach ($entries as $entry) {
            if ($entry->uri !== null && !$entry->getIsDraft() && !$entry->getIsRevision()) {
                $result[] = [
                    'uri' => $entry->uri,
                    'title' => $entry->title,
                    'id' => $entry->id,
                ];
            }
        }

        return $result;
    }
}
