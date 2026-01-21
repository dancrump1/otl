<?php

namespace revalidate;

use Craft;
use craft\base\Plugin;
use craft\web\UrlManager;
use craft\events\RegisterUrlRulesEvent;
use revalidate\services\RevalidateService;
use revalidate\models\Settings;
use revalidate\migrations\Install;
use yii\base\Event;

/**
 * Revalidate plugin
 *
 * @method static Revalidate getInstance()
 * @method Settings getSettings()
 */
class Revalidate extends Plugin
{
    public string $schemaVersion = '1.0.0';
    public bool $hasCpSettings = true;
    public bool $hasCpSection = true;

    public static function config(): array
    {
        return [
            'components' => [
                'revalidate' => RevalidateService::class,
            ],
        ];
    }

    public function init(): void
    {
        parent::init();

        // Register service
        $this->setComponents([
            'revalidate' => RevalidateService::class,
        ]);

        // Register CP routes
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules[$this->id] = 'revalidate/revalidate/index';
                $event->rules[$this->id . '/new'] = 'revalidate/revalidate/new';
                $event->rules[$this->id . '/<itemId:\d+>'] = 'revalidate/revalidate/edit';
            }
        );

        // Initialize the revalidation service
        $this->revalidate->init();
    }

    protected function createSettingsModel(): ?\craft\base\Model
    {
        return new Settings();
    }

    protected function settingsHtml(): ?string
    {
        return Craft::$app->getView()->renderTemplate(
            'revalidate/_settings',
            [
                'plugin' => $this,
                'settings' => $this->getSettings(),
            ]
        );
    }

    public function install(): void
    {
        parent::install();
        // Migrations are handled automatically by Craft CMS
    }

    public function uninstall(): void
    {
        parent::uninstall();
        // Migrations are handled automatically by Craft CMS
    }
}
