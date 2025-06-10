<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'manage users',
            'create project',
            'update project',
            'delete project',
            'assign tasks',
            'update tasks',
            'comment tasks',
            'view dashboard'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $admin = Role::create(['name' => 'Admin']);
        $admin->givePermissionTo(Permission::all());

        $projectManager = Role::create(['name' => 'Project Manager']);
        $projectManager->givePermissionTo([
            'create project',
            'update project',
            'assign tasks',
            'update tasks',
            'comment tasks',
            'view dashboard'
        ]);

        $teamMember = Role::create(['name' => 'Team Member']);
        $teamMember->givePermissionTo([
            'update tasks',
            'comment tasks',
            'view dashboard'
        ]);
    }
} 