<?php

namespace revalidate\queue\jobs;

use Craft;
use craft\queue\BaseJob;
use craft\helpers\App;
use GuzzleHttp\Client;

/**
 * RevalidateJob queue job
 */
class RevalidateJob extends BaseJob
{
    public string $uri = '';

    public function execute($queue): void
    {
        $settings = \revalidate\Revalidate::getInstance()->getSettings();
        $uiBaseUrl = $settings->uiBaseUrl ?: App::env('UI_BASE_URL');
        $secret = $settings->revalidationSecret ?: App::env('REVALIDATION_SECRET');

        if (!$uiBaseUrl || !$secret) {
            Craft::error('Revalidation: UI_BASE_URL or REVALIDATION_SECRET not configured.', __METHOD__);
            return;
        }

        $client = new Client();
        $url = $uiBaseUrl . '/api/revalidate?uri=';

        $url .= urlencode($this->uri);
        $url .= '&secret=' . $secret;

        try {
            $response = $client->post($url);
            if ($response->getStatusCode() === 200) {
                Craft::info('Next.js revalidation successful for URI: ' . $this->uri, __METHOD__);
            } else {
                Craft::error('Next.js revalidation failed: ' . $response->getBody(), __METHOD__);
            }
        } catch (\Exception $e) {
            Craft::error('Next.js revalidation error: ' . $e->getMessage(), __METHOD__);
        }
    }

    protected function defaultDescription(): string
    {
        return 'Revalidating ' . $this->uri;
    }
}
