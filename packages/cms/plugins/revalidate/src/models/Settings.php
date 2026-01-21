<?php

namespace revalidate\models;

use craft\base\Model;

/**
 * Revalidate settings
 */
class Settings extends Model
{
    public ?string $uiBaseUrl = null;
    public ?string $revalidationSecret = null;

    public function rules(): array
    {
        return [
            [['uiBaseUrl', 'revalidationSecret'], 'string'],
        ];
    }
}
