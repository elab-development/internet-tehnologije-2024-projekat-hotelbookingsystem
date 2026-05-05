<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Reservation::query();

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $reservations = $query->get();
        return response()->json(ReservationResource::collection($reservations));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'reservation_code' => 'required|string|max:50|unique:reservations,reservation_code',
            'reservation_status' => 'required|in:pending,confirmed,cancelled,completed',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guest_count' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $reservation = Reservation::create($validated);
        return response()->json(new ReservationResource($reservation), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation): JsonResponse
    {
        return response()->json(new ReservationResource($reservation));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'reservation_code' => 'required|string|max:50|unique:reservations,reservation_code,' . $reservation->id,
            'reservation_status' => 'required|in:pending,confirmed,cancelled,completed',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'guest_count' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $reservation->update($validated);
        return response()->json(new ReservationResource($reservation));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation): JsonResponse
    {
        $reservation->delete();
        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
