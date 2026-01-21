<?php

namespace revalidate\migrations;

use Craft;
use craft\db\Migration;

/**
 * Installation Migration
 */
class Install extends Migration
{
    public function safeUp(): bool
    {
        if (!$this->db->schema->getTableSchema('{{%revalidate_items}}')) {
            $this->createTable('{{%revalidate_items}}', [
                'id' => $this->primaryKey(),
                'contentHandle' => $this->string()->notNull(),
                'type' => $this->string(20)->notNull(), // 'section', 'navigation', 'uri'
                'description' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]);

            $this->createIndex(null, '{{%revalidate_items}}', ['contentHandle', 'type'], false);
        }

        return true;
    }

    public function safeDown(): bool
    {
        $this->dropTableIfExists('{{%revalidate_items}}');
        return true;
    }
}
