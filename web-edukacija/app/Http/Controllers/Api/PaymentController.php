<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = min(50, max(1, (int) $request->get('per_page', 10)));
        
        $query = Payment::query();

        if ($request->filled('reservation_id')) {
            $query->where('reservation_id', $request->get('reservation_id'));
        }

        if ($request->filled('payment_method')) {
            $query->where('payment_method', $request->get('payment_method'));
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->get('payment_status'));
        }

        $payments = $query->paginate($perPage);
        return PaymentResource::collection($payments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,card,bank_transfer',
            'payment_status' => 'required|in:pending,paid,failed,refunded',
            'transaction_code' => 'nullable|string|max:50|unique:payments,transaction_code',
        ]);

        $payment = Payment::create($validated);
        return response()->json(new PaymentResource($payment), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment): JsonResponse
    {
        return response()->json(new PaymentResource($payment));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment): JsonResponse
    {
        $validated = $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,card,bank_transfer',
            'payment_status' => 'required|in:pending,paid,failed,refunded',
            'transaction_code' => 'nullable|string|max:50|unique:payments,transaction_code,' . $payment->id,
        ]);

        $payment->update($validated);
        return response()->json(new PaymentResource($payment));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment): JsonResponse
    {
        $payment->delete();
        return response()->json(['message' => 'Payment deleted successfully']);
    }
}
