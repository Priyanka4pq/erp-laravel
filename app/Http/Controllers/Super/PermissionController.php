<?php

namespace App\Http\Controllers\Super;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    // Show Inertia Page
    public function index()
    {
        return Inertia::render('supperAdmin/Permission');
    }

    // Store New Permission
    public function store(Request $request)
    {
        $data = $request->validate([
            'feature' => 'required|string|max:255',
            'permissions' => 'required|array|min:1',
            'permissions.*' => 'string|max:255',
        ]);

        $permission = Permission::create($data);

        return response()->json([
            'success' => true,
            'data' => $permission
        ], 201);
    }

    // Fetch All Permissions
    public function fetch()
    {
        return response()->json(Permission::all());
    }

    // Update Permission
    public function update(Request $request, $id)
    {
        $permission = Permission::findOrFail($id);

        $data = $request->validate([
            'feature' => 'required|string|max:255',
            'permissions' => 'required|array|min:1',
            'permissions.*' => 'string|max:255',
        ]);

        $permission->update($data);

        return response()->json([
            'success' => true,
            'data' => $permission
        ]);
    }

    // Delete Permission
    public function destroy($id)
    {
        $deleted = Permission::destroy($id);

        return response()->json([
            'success' => $deleted > 0,
        ]);
    }
}
