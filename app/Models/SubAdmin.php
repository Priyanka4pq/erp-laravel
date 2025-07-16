<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubAdmin extends Model
{
    protected $fillable = ['name', 'email', 'password', 'phone', 'dob', 'ip', 'address', 'role','permissions'];

    protected $casts = [
        'permissions' => 'array',   
        // 'module' => 'array',
    ];
    public function tokens()
    {
        return $this->hasMany(Token::class);
    }
}
