<?php

namespace revalidate\records;

use craft\db\ActiveRecord;

/**
 * RevalidateItem record
 */
class RevalidateItem extends ActiveRecord
{
    public static function tableName(): string
    {
        return '{{%revalidate_items}}';
    }

    public function rules(): array
    {
        return [
            [['contentHandle', 'type'], 'required'],
            [['contentHandle', 'type', 'description'], 'string'],
        ];
    }
}
