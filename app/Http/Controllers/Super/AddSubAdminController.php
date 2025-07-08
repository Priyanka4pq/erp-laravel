<?php

namespace App\Http\Controllers\Super;

use App\Http\Controllers\Controller;
use App\Models\SubAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AddSubAdminController extends Controller
{
    public function index(){
        return Inertia::render('supperAdmin/AddSubAdmin');
    }

       public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:sub_admins,email',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string',
            'dob' => 'nullable|date',
            'ip' => 'nullable|ip',
            'address' => 'nullable|string',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        SubAdmin::create($validated);

        return redirect()->back()->with('success', 'Sub-Admin created successfully!');
    }

    public function show(SubAdmin $subAdmin)
{
   $all = SubAdmin::all();

    return response()->json([
        'status' => 'success',
        'data' => $all,
    ]);
}

}
