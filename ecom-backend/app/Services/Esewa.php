<?php

namespace App\Services;

class Esewa
{
    /**
     * Check if the payment was successful
     */
    public function isSuccess(array $response): bool
    {
        // If the status is "COMPLETE", consider it a successful payment
        return isset($response['status']) && strtoupper($response['status']) === 'COMPLETE';
    }
}
