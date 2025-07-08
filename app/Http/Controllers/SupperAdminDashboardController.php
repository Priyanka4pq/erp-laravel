<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SupperAdminDashboardController extends Controller
{
    public function index(){
        return Inertia::render('supperAdmin/Dashboard');
        }
    
}


// --- IGNORE ---// This is a placeholder for the SupperAdminDashboardController class.
// You can add methods and properties as needed to handle the dashboard functionality.
// The index method renders the Inertia view for the SupperAdmin dashboard.
// Make sure to import any necessary classes at the top of this file.   