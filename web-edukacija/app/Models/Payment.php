<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'payment_date',
        'amount',
        'payment_method',
        'payment_status',
        'transaction_code',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
