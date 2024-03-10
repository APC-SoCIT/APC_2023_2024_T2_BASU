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
        'reason',
        'description',
        'location',
        'landmark',
        'passengers',
        'start_time',
        'end_time',
        'status',
    ];

    protected $casts = [
        'passengers' => 'array'
    ];

    public function shuttleForm()
    {
        return $this->belongsTo(ShuttleForm::class);
    }
}
