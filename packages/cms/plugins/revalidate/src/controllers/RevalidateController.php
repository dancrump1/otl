<?php

namespace revalidate\controllers;

use Craft;
use craft\web\Controller;
use revalidate\models\RevalidateItem;
use revalidate\Revalidate;
use yii\web\Response;

/**
 * Revalidate Controller
 */
class RevalidateController extends Controller
{
    protected array|int|bool $allowAnonymous = false;

    public function actionIndex(): Response
    {
        $items = Revalidate::getInstance()->revalidate->getAllItems();
        $availableContentTypes = Revalidate::getInstance()->revalidate->getAvailableContentTypes();

        // Auto-add all sections if list is empty
        if (empty($items) && !empty($availableContentTypes)) {
            $this->autoAddAllSections();
            // Refresh items after adding
            $items = Revalidate::getInstance()->revalidate->getAllItems();
        }

        // Get entries for each section
        $sectionEntries = [];
        foreach ($items as $item) {
            if ($item->type === 'section') {
                $sectionEntries[$item->contentHandle] = Revalidate::getInstance()->revalidate->getEntriesForSection($item->contentHandle);
            }
        }

        return $this->renderTemplate('revalidate/index', [
            'items' => $items,
            'availableContentTypes' => $availableContentTypes,
            'sectionEntries' => $sectionEntries,
            'plugin' => Revalidate::getInstance(),
        ]);
    }

    protected function autoAddAllSections(): void
    {
        $availableContentTypes = Revalidate::getInstance()->revalidate->getAvailableContentTypes();
        $existingItems = Revalidate::getInstance()->revalidate->getAllItems();
        
        // Create a map of existing items by contentHandle
        $existingMap = [];
        foreach ($existingItems as $existingItem) {
            if ($existingItem->type === 'section') {
                $existingMap[$existingItem->contentHandle] = true;
            }
        }

        foreach ($availableContentTypes as $contentType) {
            // Skip if already exists
            if (isset($existingMap[$contentType['handle']])) {
                continue;
            }

            $item = new RevalidateItem();
            $item->contentHandle = $contentType['handle'];
            $item->type = 'section';
            $item->description = 'Auto-added: ' . $contentType['name'];

            Revalidate::getInstance()->revalidate->saveItem($item);
        }
    }

    public function actionNew(): Response
    {
        $item = new RevalidateItem();
        $availableContentTypes = Revalidate::getInstance()->revalidate->getAvailableContentTypes();

        return $this->renderTemplate('revalidate/edit', [
            'item' => $item,
            'availableContentTypes' => $availableContentTypes,
            'plugin' => Revalidate::getInstance(),
        ]);
    }

    public function actionEdit(int $itemId): Response
    {
        $item = Revalidate::getInstance()->revalidate->getItemById($itemId);

        if (!$item) {
            Craft::$app->getSession()->setError(Craft::t('revalidate', 'Item not found.'));
            return $this->redirect(Revalidate::getInstance()->id);
        }

        $availableContentTypes = Revalidate::getInstance()->revalidate->getAvailableContentTypes();

        return $this->renderTemplate('revalidate/edit', [
            'item' => $item,
            'availableContentTypes' => $availableContentTypes,
            'plugin' => Revalidate::getInstance(),
        ]);
    }

    public function actionSave(): ?Response
    {
        $this->requirePostRequest();

        $itemId = Craft::$app->getRequest()->getBodyParam('itemId');
        $contentHandle = Craft::$app->getRequest()->getBodyParam('contentHandle');
        $type = Craft::$app->getRequest()->getBodyParam('type');
        $description = Craft::$app->getRequest()->getBodyParam('description');

        if ($itemId) {
            $item = Revalidate::getInstance()->revalidate->getItemById($itemId);
            if (!$item) {
                Craft::$app->getSession()->setError(Craft::t('revalidate', 'Item not found.'));
                return $this->redirect(Revalidate::getInstance()->id);
            }
        } else {
            $item = new RevalidateItem();
        }

        $item->contentHandle = $contentHandle;
        $item->type = $type;
        $item->description = $description;

        // Check for duplicates before validation
        $existingItem = \revalidate\records\RevalidateItem::find()
            ->where(['contentHandle' => $contentHandle, 'type' => $type])
            ->andWhere(['!=', 'id', $itemId ?: 0])
            ->one();

        if ($existingItem) {
            Craft::$app->getSession()->setError(Craft::t('revalidate', 'You have already saved that item.'));
            Craft::$app->getUrlManager()->setRouteParams([
                'item' => $item,
            ]);
            return null;
        }

        if (!$item->validate()) {
            Craft::$app->getSession()->setError(Craft::t('revalidate', 'Couldn\'t save item.'));
            Craft::$app->getUrlManager()->setRouteParams([
                'item' => $item,
            ]);
            return null;
        }

        if (Revalidate::getInstance()->revalidate->saveItem($item)) {
            Craft::$app->getSession()->setNotice(Craft::t('revalidate', 'Item saved.'));
            return $this->redirect(Revalidate::getInstance()->id);
        }

        Craft::$app->getSession()->setError(Craft::t('revalidate', 'Couldn\'t save item.'));
        Craft::$app->getUrlManager()->setRouteParams([
            'item' => $item,
        ]);

        return null;
    }

    public function actionDelete(): Response
    {
        $this->requirePostRequest();

        $itemId = Craft::$app->getRequest()->getRequiredBodyParam('itemId');
        $item = Revalidate::getInstance()->revalidate->getItemById($itemId);

        if (!$item) {
            Craft::$app->getSession()->setError(Craft::t('revalidate', 'Item not found.'));
            return $this->redirect(Revalidate::getInstance()->id);
        }

        if (Revalidate::getInstance()->revalidate->deleteItem($item)) {
            Craft::$app->getSession()->setNotice(Craft::t('revalidate', 'Item deleted.'));
        } else {
            Craft::$app->getSession()->setError(Craft::t('revalidate', 'Couldn\'t delete item.'));
        }

        return $this->redirect(Revalidate::getInstance()->id);
    }

    public function actionAddAll(): Response
    {
        $this->requirePostRequest();

        $availableContentTypes = Revalidate::getInstance()->revalidate->getAvailableContentTypes();
        $existingItems = Revalidate::getInstance()->revalidate->getAllItems();
        
        // Create a map of existing items by contentHandle and type
        $existingMap = [];
        foreach ($existingItems as $existingItem) {
            if ($existingItem->type === 'section') {
                $existingMap[$existingItem->contentHandle] = true;
            }
        }

        $addedCount = 0;
        $skippedCount = 0;

        foreach ($availableContentTypes as $contentType) {
            // Skip if already exists
            if (isset($existingMap[$contentType['handle']])) {
                $skippedCount++;
                continue;
            }

            $item = new RevalidateItem();
            $item->contentHandle = $contentType['handle'];
            $item->type = 'section';
            $item->description = 'Auto-added: ' . $contentType['name'];

            if (Revalidate::getInstance()->revalidate->saveItem($item)) {
                $addedCount++;
            }
        }

        if ($addedCount > 0) {
            Craft::$app->getSession()->setNotice(Craft::t('revalidate', 'Added {count} section(s).', ['count' => $addedCount]));
        }
        
        if ($skippedCount > 0) {
            Craft::$app->getSession()->setNotice(Craft::t('revalidate', 'Added {count} section(s). {skipped} already existed.', ['count' => $addedCount, 'skipped' => $skippedCount]));
        }

        if ($addedCount === 0 && $skippedCount === 0) {
            Craft::$app->getSession()->setNotice(Craft::t('revalidate', 'No sections to add.'));
        }

        return $this->redirect(Revalidate::getInstance()->id);
    }

    public function actionRevalidate(): Response
    {
        $this->requirePostRequest();

        $itemId = Craft::$app->getRequest()->getBodyParam('itemId');
        
        if ($itemId) {
            $item = Revalidate::getInstance()->revalidate->getItemById($itemId);
            if ($item) {
                if ($item->type === 'uri') {
                    Revalidate::getInstance()->revalidate->revalidateUri($item->contentHandle);
                } else {
                    Revalidate::getInstance()->revalidate->revalidateByContentType($item->contentHandle, $item->type);
                }
                Craft::$app->getSession()->setNotice(Craft::t('revalidate', 'Revalidation queued for: {handle}', ['handle' => $item->getDisplayName()]));
            } else {
                Craft::$app->getSession()->setError(Craft::t('revalidate', 'Item not found.'));
            }
        } else {
            // Revalidate all manual items
            Revalidate::getInstance()->revalidate->revalidateAllManualItems();
            Craft::$app->getSession()->setNotice(Craft::t('revalidate', 'All items queued for revalidation.'));
        }

        return $this->redirect(Revalidate::getInstance()->id);
    }
}
