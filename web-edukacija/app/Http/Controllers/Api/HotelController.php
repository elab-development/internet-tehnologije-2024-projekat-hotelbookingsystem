<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HotelResource;
use App\Http\Resources\RoomResource;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = min(50, max(1, (int) $request->get('per_page', 10)));
        
        $query = Hotel::query();

        if ($request->filled('city')) {
            $query->where('city', 'like', '%' . $request->get('city') . '%');
        }

        if ($request->filled('country')) {
            $query->where('country', 'like', '%' . $request->get('country') . '%');
        }

        $hotels = $query->paginate($perPage);
        return HotelResource::collection($hotels);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'hotel_name' => 'required|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'email' => 'required|email|unique:hotels,email',
            'phone_number' => 'required|string|unique:hotels,phone_number',
        ]);

        $hotel = Hotel::create($validated);
        return response()->json(new HotelResource($hotel), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hotel $hotel): JsonResponse
    {
        return response()->json(new HotelResource($hotel));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hotel $hotel): JsonResponse
    {
        $validated = $request->validate([
            'hotel_name' => 'required|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'email' => 'required|email|unique:hotels,email,' . $hotel->id,
            'phone_number' => 'required|string|unique:hotels,phone_number,' . $hotel->id,
        ]);

        $hotel->update($validated);
        return response()->json(new HotelResource($hotel));
    }

    /**
     * Display rooms for the specified hotel.
     */
    public function rooms(Hotel $hotel): JsonResponse
    {
        $rooms = $hotel->rooms;
        return response()->json(RoomResource::collection($rooms));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel): JsonResponse
    {
        $hotel->delete();
        return response()->json(['message' => 'Hotel deleted successfully']);
    }
}
