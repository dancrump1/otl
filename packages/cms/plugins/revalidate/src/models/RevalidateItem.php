<?php

namespace revalidate\models;

use craft\base\Model;
use revalidate\records\RevalidateItem as RevalidateItemRecord;

/**
 * RevalidateItem model
 */
class RevalidateItem extends Model
{
    public ?int $id = null;
    public ?string $contentHandle = null;
    public ?string $type = null; // 'section', 'navigation', 'uri'
    public ?string $description = null;
    public ?\DateTime $dateCreated = null;
    public ?\DateTime $dateUpdated = null;
    public ?string $uid = null;

    public function rules(): array
    {
        return [
            [['contentHandle', 'type'], 'required'],
            [['contentHandle', 'type', 'description'], 'string'],
            [['id'], 'integer'],
            [['type'], 'in', 'range' => ['section', 'uri']],
        ];
    }

    public function attributeLabels(): array
    {
        return [
            'contentHandle' => 'Content Handle',
            'type' => 'Type',
            'description' => 'Description',
        ];
    }

    public static function populateModel($record, $row): ?self
    {
        if ($record === null) {
            return null;
        }

        $model = new static();
        $model->id = $record->id;
        $model->contentHandle = $record->contentHandle;
        $model->type = $record->type;
        $model->description = $record->description;
        
        // Convert date strings to DateTime objects if needed
        if ($record->dateCreated !== null) {
            $model->dateCreated = $record->dateCreated instanceof \DateTime 
                ? $record->dateCreated 
                : new \DateTime($record->dateCreated);
        }
        
        if ($record->dateUpdated !== null) {
            $model->dateUpdated = $record->dateUpdated instanceof \DateTime 
                ? $record->dateUpdated 
                : new \DateTime($record->dateUpdated);
        }
        
        $model->uid = $record->uid;

        return $model;
    }

    public function save(bool $runValidation = true, $attributeNames = null): bool
    {
        if ($runValidation && !$this->validate($attributeNames)) {
            return false;
        }

        $record = $this->id ? RevalidateItemRecord::findOne($this->id) : new RevalidateItemRecord();

        if (!$record) {
            $record = new RevalidateItemRecord();
        }

        $record->contentHandle = $this->contentHandle;
        $record->type = $this->type;
        $record->description = $this->description;

        $result = $record->save(false);

        if ($result) {
            $this->id = $record->id;
            
            // Convert date strings to DateTime objects if needed
            if ($record->dateCreated !== null) {
                $this->dateCreated = $record->dateCreated instanceof \DateTime 
                    ? $record->dateCreated 
                    : new \DateTime($record->dateCreated);
            }
            
            if ($record->dateUpdated !== null) {
                $this->dateUpdated = $record->dateUpdated instanceof \DateTime 
                    ? $record->dateUpdated 
                    : new \DateTime($record->dateUpdated);
            }
            
            $this->uid = $record->uid;
        }

        return $result;
    }

    public function delete(): bool
    {
        if (!$this->id) {
            return false;
        }

        $record = RevalidateItemRecord::findOne($this->id);
        if (!$record) {
            return false;
        }

        return $record->delete();
    }

    public function getDisplayName(): string
    {
        if ($this->type === 'uri') {
            return $this->contentHandle;
        }
        return $this->contentHandle . ' (' . $this->type . ')';
    }
}
