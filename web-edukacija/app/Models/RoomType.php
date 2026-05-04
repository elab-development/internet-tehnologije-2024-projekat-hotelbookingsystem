<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_type_name',
        'capacity',
        'price_per_night',
        'description',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
