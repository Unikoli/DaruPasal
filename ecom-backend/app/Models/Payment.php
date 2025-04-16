<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'transaction_uuid',
        'amount',
        'tax_amount',
        'total_amount',
        // 'product_code',
        'status'
    ];
    public function order()
{
    return $this->belongsTo(Order::class);
}

}
