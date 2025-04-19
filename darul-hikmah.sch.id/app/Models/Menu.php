<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = ['id', 'parent', 'name', 'link', 'description', 'child'];
    public $timestamps = false;
}
