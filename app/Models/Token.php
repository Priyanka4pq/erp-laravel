<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
 protected $fillable = [
    'token', 
    'status', 
    'sub_admin_id', 
    'regen_count', 
    'last_regen_at',
    'token_limit',
    'token_used'
];
    public $timestamps = true;

    
protected $casts = [
    'last_regen_at' => 'datetime',
    'regen_count' => 'integer',
     'token_limit' => 'integer',
        'token_used' => 'integer',
];



    public function subAdmin()
    {
        return $this->belongsTo(SubAdmin::class);
    }
}
