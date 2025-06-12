<?php

namespace Database\Seeders;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projectId = 1;

        $Admin = 1;

        $memberIds = [
            'Martin' => 4,
            'Firja' => 5,
            'backend' => 3,
            'Rizki Dwi' => 6,
            'Aristio' => 7,
        ];

        $now = Carbon::now();

        $tasks = [
            // Project Setup Tasks
            [
                'project_id' => $projectId,
                'title' => 'Perbaikan Tampilan dll di web',
                'description' => 'Mengatur apa yang perlu diinstalasi dan dikonfigurasi untuk projek web ini',
                'assigned_to' => $memberIds['Martin'],
                'priority' => 'high',
                'status' => 'completed',
                'due_date' => $now->copy()->subDays(5),
            ],
            [
                'project_id' => $projectId,
                'title' => 'Melakukan Permision Role',
                'description' => 'Melakukan Pengeditan Permision role untuk login',
                'assigned_to' => $memberIds['Rizki Dwi'],
                'priority' => 'high',
                'status' => 'completed',
                'due_date' => $now->copy()->subDays(4),
            ],

            // Firja Tasks
            [
                'project_id' => $projectId,
                'title' => 'Membuat tampilan Erd dan Mencari referensi',
                'description' => 'membuat erd dan di upload ke dalam readme mencari referensi untuk web',
                'assigned_to' => $memberIds['Firja'],
                'priority' => 'medium',
                'status' => 'completed',
                'due_date' => $now->copy()->addDays(2),
            ],
            [
                'project_id' => $projectId,
                'title' => 'Editing web dan Backend ',
                'description' => 'Melakukan Pengeditan backend dan frontend untuk menghasilkan web yang berjalan sesuai ketentuan dan permission role',
                'assigned_to' => $memberIds['Martin'],
                'priority' => 'high',
                'status' => 'completed',
                'due_date' => $now->copy()->addDays(3),
            ],

            // Backend Tasks
            [
                'project_id' => $projectId,
                'title' => 'deployment untuk di web',
                'description' => 'Melakukan deployment untuk aplikasi web dan disuruh upload heroku namun tidak menemukan yg gratis',
                'assigned_to' => $memberIds['Aristio'],
                'priority' => 'high',
                'status' => 'in_progress',
                'due_date' => $now->copy()->addDays(4),
            ],
            [
                'project_id' => $projectId,
                'title' => 'membuat projek dan konfig jwt,db dll',
                'description' => 'Implement JWT authentication and authorization dan migration lain lain yang menjadii pendukung web',
                'assigned_to' => $memberIds['Martin'],
                'priority' => 'high',
                'status' => 'completed',
                'due_date' => $now->copy()->addDays(3),
            ],

            // Design Tasks
            [
                'project_id' => $projectId,
                'title' => 'UI/UX Wireframes',
                'description' => 'Create wireframes for all major screens',
                'assigned_to' => $memberIds['Martin'],
                'priority' => 'medium',
                'status' => 'completed',
                'due_date' => $now->copy()->subDays(3),
            ],
            [
                'project_id' => $projectId,
                'title' => 'Membantu menyiapkan finalisasi projek',
                'description' => 'Menyiapkan apk untuk record web',
                'assigned_to' => $memberIds['Rizki Dwi'],
                'priority' => 'low',
                'status' => 'completed',
                'due_date' => $now->copy()->addDays(1),
            ],

            // Testing Tasks
            [
                'project_id' => $projectId,
                'title' => 'mencari laravel vite',
                'description' => 'Firja ,aris dan Dwi mencari referensi laravel vite',
                'assigned_to' => $memberIds['Aristio'],
                'priority' => 'medium',
                'status' => 'completed',
                'due_date' => $now->copy()->addDays(5),
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}