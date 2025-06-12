<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'name' => "TUBES PEMWEB",
            'description' => 'mempuat web task management',
            'user_id' => 2,
            'start_date' => now()   ,
            'end_date' => now()->addMonths(2),
            'progress' => 0,
            'status' => 'completed',
            'budget' => 999999,
            'spent_budget' => 0.0,
            'category' => 'Web Development',
            'tags' =>['web', 'development'],
            'is_template' => 0,
            'attachments' => [],
        ]);
    }
}
