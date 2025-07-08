<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class SubAdmin extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'password', 'phone', 'dob', 'ip', 'address',
    ];

    protected $hidden = [
        'password',
    ];
}
