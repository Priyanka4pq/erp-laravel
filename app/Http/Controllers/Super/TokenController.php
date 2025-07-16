<?php

namespace App\Http\Controllers\Super;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Token;
use App\Models\SubAdmin;
use Inertia\Inertia;
class TokenController extends Controller
{
    public function index()
{
    $tokens = Token::with('subAdmin:id,name')->get()->map(function ($token) {
        return [
     'id' => $token->id,
            'token' => $token->token,
            'status' => $token->status,
            'sub_admin_id' => $token->sub_admin_id,
            'sub_admin' => $token->subAdmin,
            'token_limit' => $token->token_limit ?? 0,  // Add default value
            'token_used' => $token->token_used ?? 0,    // Add default value
            'regenCount' => $token->regen_count,
            'lastRegenAt' => $token->last_regen_at,
            'createdAt' => $token->created_at?->format('Y-m-d'),
        ];
    });
    $subAdmins = SubAdmin::select('id', 'name')->get();

    return Inertia::render('supperAdmin/token', [
        'tokens' => $tokens,
        'subAdmins' => $subAdmins,
    ]);
}

public function store(Request $request)
{
    $validated = $request->validate([
        'token' => 'required|string',
        'status' => 'required|in:Active,Expired',
        'sub_admin_id' => 'required|exists:sub_admins,id',
        'token_limit' => 'required|integer|min:0',  // Add validation
    ]);


      $token = Token::create([
        ...$validated,
        'token_used' => 0,  // Initialize token_used
    ]);
        $token = Token::with('subAdmin:id,name')->find($token->id);
    // $token->load('subAdmin:id,name'); // Eager load subadmin

    return response()->json([
        'token' => [
            'id' => $token->id,
            'token' => $token->token,
            'status' => $token->status,
            'sub_admin_id' => $token->sub_admin_id,
            'sub_admin' => $token->subAdmin,
            'createdAt' => $token->created_at ? $token->created_at->format('Y-m-d') : null,
            'regenCount' => $token->regen_count ?? 0,
            'lastRegenAt' => optional($token->last_regen_at)?->timestamp ?? null,
            'token_limit' => $token->token_limit,
        'token_used' => $token->token_used,
        ]
    ], 201);
}

public function update(Request $request, $id)
{
    $validated = $request->validate([
        'token' => 'required|string',
        'status' => 'required|in:Active,Expired',
        'sub_admin_id' => 'required|exists:sub_admins,id',
    ]);

    $token = Token::findOrFail($id);
    $token->update($validated);

    return response()->json(['message' => 'Updated']);
}

public function destroy($id)
{
    Token::destroy($id);

    return response()->json(['message' => 'Deleted']);
}

public function regenerate($id)
{
    $token = Token::findOrFail($id);

    // Safety: max 3 times
    if ($token->regen_count >= 3) {
        return response()->json(['message' => 'Max regeneration reached'], 403);
    }

    // Optional cooldown logic
    $cooldownSeconds = 30;
    if ($token->last_regen_at && now()->diffInSeconds($token->last_regen_at) < $cooldownSeconds) {
        return response()->json(['message' => 'Cooldown active'], 429);
    }

    $token->update([
        'token' => strtoupper(str()->random(8)),
        'regen_count' => $token->regen_count + 1,
        'last_regen_at' => now(),
    ]);

    return response()->json(['message' => 'Token regenerated', 'token' => $token]);
}


}
