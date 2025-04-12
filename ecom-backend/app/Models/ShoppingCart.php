<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    use HasFactory;
     // Add the fields to the $fillable array to allow mass assignment
     protected $fillable = [
        'user_id',
        'product_id',
        'quantity'
    ];
    public function product() {
        return $this->belongsTo(Product::class);
    }
    
    public function user() {
        return $this->belongsTo(User::class);
    }

}
