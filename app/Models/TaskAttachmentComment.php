<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskAttachmentComment extends Model
{
    protected $fillable = [
        'task_attachment_id',
        'user_id',
        'content',
    ];

    public function attachment(): BelongsTo
    {
        return $this->belongsTo(TaskAttachment::class, 'task_attachment_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
} 