<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomTypeResource;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RoomTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = min(50, max(1, (int) $request->get('per_page', 10)));
        
        $query = RoomType::query();

        if ($request->filled('capacity')) {
            $query->where('capacity', $request->get('capacity'));
        }

        if ($request->filled('min_price')) {
            $query->where('price_per_night', '>=', $request->get('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price_per_night', '<=', $request->get('max_price'));
        }

        $roomTypes = $query->paginate($perPage);
        return RoomTypeResource::collection($roomTypes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'room_type_name' => 'required|string|max:255|unique:room_types,room_type_name',
            'capacity' => 'required|integer|min:1',
            'price_per_night' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
        ]);

        $roomType = RoomType::create($validated);
        return response()->json(new RoomTypeResource($roomType), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RoomType $roomType): JsonResponse
    {
        return response()->json(new RoomTypeResource($roomType));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoomType $roomType): JsonResponse
    {
        $validated = $request->validate([
            'room_type_name' => 'required|string|max:255|unique:room_types,room_type_name,' . $roomType->id,
            'capacity' => 'required|integer|min:1',
            'price_per_night' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
        ]);

        $roomType->update($validated);
        return response()->json(new RoomTypeResource($roomType));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomType $roomType): JsonResponse
    {
        $roomType->delete();
        return response()->json(['message' => 'Room type deleted successfully']);
    }
}
