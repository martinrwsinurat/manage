<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class TaskAttachment extends Model
{
    protected $fillable = [
        'filename',
        'path',
        'type',
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(TaskAttachmentComment::class);
    }

    public function delete()
    {
        // Delete file from Cloudinary
        Storage::disk('cloudinary')->delete($this->path);
        return parent::delete();
    }
} 