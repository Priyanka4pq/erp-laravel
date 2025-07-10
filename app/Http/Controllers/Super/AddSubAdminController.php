<?php

namespace App\Http\Controllers\Super;

use App\Http\Controllers\Controller;
use App\Models\SubAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AddSubAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('supperAdmin/AddSubAdmin');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:sub_admins,email',
                'password' => 'required|string|min:6',
                'phone' => 'nullable|string|max:20',
                'dob' => 'nullable|date',
                'ip' => 'nullable|ip',
                'address' => 'nullable|string',
                'permissions' => 'nullable|array',
                'permissions.*' => 'string|max:255',
            ]);

            $validated['password'] = Hash::make($validated['password']);
            SubAdmin::create($validated);

            return response()->json(['success' => 'Sub-Admin created successfully'], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create sub-admin'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $subAdmin = SubAdmin::findOrFail($id);
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:sub_admins,email,' . $id,
                'password' => 'nullable|string|min:6',
                'phone' => 'nullable|string|max:20',
                'dob' => 'nullable|date',
                'ip' => 'nullable|ip',
                'address' => 'nullable|string',
                'permissions' => 'nullable|array',
                'permissions.*' => 'string|max:255',
            ]);

            if ($validated['password']) {
                $validated['password'] = Hash::make($validated['password']);
            } else {
                unset($validated['password']);
            }

            $subAdmin->update($validated);

            return response()->json(['success' => 'Sub-Admin updated successfully'], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update sub-admin'], 500);
        }
    }

    public function show()
    {
        try {
            $subAdmins = SubAdmin::all();
            return response()->json([
                'status' => 'success',
                'data' => $subAdmins,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch sub-admins'], 500);
        }
    }
}