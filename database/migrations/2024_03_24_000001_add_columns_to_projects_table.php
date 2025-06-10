<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Progress tracking
            $table->integer('progress')->default(0)->after('end_date');
            $table->enum('status', ['not_started', 'in_progress', 'on_hold', 'completed'])->default('not_started')->after('progress');
            
            // Budget tracking
            $table->decimal('budget', 15, 2)->nullable()->after('status');
            $table->decimal('spent_budget', 15, 2)->default(0)->after('budget');
            
            // Project metadata
            $table->string('category')->nullable()->after('spent_budget');
            $table->json('tags')->nullable()->after('category');
            $table->boolean('is_template')->default(false)->after('tags');
            
            // File attachments
            $table->json('attachments')->nullable()->after('is_template');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'progress',
                'status',
                'budget',
                'spent_budget',
                'category',
                'tags',
                'is_template',
                'attachments'
            ]);
        });
    }
}; 