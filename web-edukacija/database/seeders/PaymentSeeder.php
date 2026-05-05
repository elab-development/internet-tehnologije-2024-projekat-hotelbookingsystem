<?php

namespace Database\Seeders;

use App\Models\Payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payments = [
            [
                'reservation_id' => 1, // RES-20240001
                'payment_date' => '2024-06-10',
                'amount' => 269.97, // 3 nights * 89.99
                'payment_method' => 'credit_card',
                'payment_status' => 'completed',
                'transaction_code' => 'TXN20240001',
            ],
            [
                'reservation_id' => 2, // RES-20240002
                'payment_date' => '2024-06-25',
                'amount' => 359.96, // 4 nights * 89.99
                'payment_method' => 'bank_transfer',
                'payment_status' => 'completed',
                'transaction_code' => 'TXN20240002',
            ],
            [
                'reservation_id' => 3, // RES-20240003
                'payment_date' => '2024-08-05',
                'amount' => 599.98, // 2 nights * 299.99
                'payment_method' => 'credit_card',
                'payment_status' => 'pending',
                'transaction_code' => null,
            ],
            [
                'reservation_id' => 4, // RES-20240004
                'payment_date' => '2024-05-01',
                'amount' => 179.98, // 2 nights * 89.99
                'payment_method' => 'cash',
                'payment_status' => 'completed',
                'transaction_code' => 'TXN20240004',
            ],
            [
                'reservation_id' => 5, // RES-20240005
                'payment_date' => '2024-09-15',
                'amount' => 449.95, // 5 nights * 89.99
                'payment_method' => 'paypal',
                'payment_status' => 'completed',
                'transaction_code' => 'TXN20240005',
            ],
            [
                'reservation_id' => 6, // RES-20240006 (cancelled)
                'payment_date' => '2024-06-01',
                'amount' => 149.99, // 1 night * 149.99
                'payment_method' => 'credit_card',
                'payment_status' => 'refunded',
                'transaction_code' => 'TXN20240006',
            ],
            [
                'reservation_id' => 7, // RES-20240007
                'payment_date' => '2024-07-10',
                'amount' => 999.95, // 5 nights * 199.99
                'payment_method' => 'bank_transfer',
                'payment_status' => 'completed',
                'transaction_code' => 'TXN20240007',
            ],
            [
                'reservation_id' => 8, // RES-20240008
                'payment_date' => '2024-10-01',
                'amount' => 599.97, // 3 nights * 199.99
                'payment_method' => 'credit_card',
                'payment_status' => 'completed',
                'transaction_code' => 'TXN20240008',
            ],
        ];

        foreach ($payments as $payment) {
            Payment::create($payment);
        }
    }
}
