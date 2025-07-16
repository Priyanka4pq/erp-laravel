<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Super\AddSubAdminController;
use App\Http\Controllers\Super\PermissionController;
use App\Http\Controllers\Super\SupperAdminDashboardController;
use App\Http\Controllers\SubAdminDashboardController;
use App\Http\Controllers\Super\TokenController;

// ---------------- Simple Test POST Routes ----------------
Route::post('/ping', function () {
    return response()->json(['message' => 'pong']);
});

Route::post('/test-post', function () {
    return response()->json(['message' => 'CSRF bypassed']);
});




// ---------------- Super Admin Routes ----------------
Route::prefix('supper')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\SupperAdminDashboardController::class, 'index'])->name('supper.dashboard.index');
    Route::get('addsubadmin', [AddSubAdminController::class, 'index'])
        ->name('supper.addsubadmin.index'); // Inertia page
    Route::post('add-subadmin', [AddSubAdminController::class, 'store'])->name('supper.adduser.store');
    Route::put('update-subadmin/{id}', [AddSubAdminController::class, 'update'])->name('supper.update-subadmin');
    Route::get('fetch-subadmin', [AddSubAdminController::class, 'show'])->name('supper.subadmin.show');
    Route::get('permission', [PermissionController::class, 'index']); // Inertia page
    Route::post('permission', [PermissionController::class, 'store']);
    Route::get('permission-list', [PermissionController::class, 'fetch']);
    Route::put('permission/{id}', [PermissionController::class, 'update']);
    Route::delete('permission/{id}', [PermissionController::class, 'destroy']);
    Route::get('roles', [PermissionController::class, 'getRoles']);
    Route::delete('delete-subadmin/{id}', [AddSubAdminController::class, 'destroy'])->name('supper.delete-subadmin');
// ---------------- Token Routes ----------------
    Route::get('token', [\App\Http\Controllers\Super\TokenController::class, 'index'])
        ->name('supper.token.index'); // Inertia page
        Route::post('tokens', [TokenController::class, 'store'])->name('supper.token.store');
Route::put('tokens/{id}', [TokenController::class, 'update'])->name('supper.token.update');
Route::delete('tokens/{id}', [TokenController::class, 'destroy'])->name('supper.token.delete');
Route::post('tokens/{id}/regenerate', [TokenController::class, 'regenerate']);



// role route added


});


// ---------------- Sub Admin Routes ----------------
Route::prefix('subadmin')->group(function () {
    Route::get('dashboard', [SubAdminDashboardController::class, 'index'])
        ->name('subadmin.dashboard.index');
});

// ---------------- CSRF Token Test Route ----------------
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});

