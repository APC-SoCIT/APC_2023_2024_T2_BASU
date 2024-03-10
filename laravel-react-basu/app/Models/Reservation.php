<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'passengers',
        'reason',
        'description',
        'location',
        'landmark',
        'passenger',
        'start_time',
        'end_time',
        'status',
    ];
}
