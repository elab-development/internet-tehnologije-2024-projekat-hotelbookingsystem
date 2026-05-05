<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Room::query();

        if ($request->has('hotel_id')) {
            $query->where('hotel_id', $request->hotel_id);
        }

        $rooms = $query->get();
        return response()->json(RoomResource::collection($rooms));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'room_type_id' => 'required|exists:room_types,id',
            'room_number' => [
                'required',
                'string',
                'max:50',
                Rule::unique('rooms')->where(function ($query) use ($request) {
                    return $query->where('hotel_id', $request->hotel_id);
                }),
            ],
            'floor_number' => 'required|integer|min:1',
            'status' => 'required|in:available,occupied,maintenance,cleaning',
        ]);

        $room = Room::create($validated);
        return response()->json(new RoomResource($room), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room): JsonResponse
    {
        return response()->json(new RoomResource($room));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room): JsonResponse
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'room_type_id' => 'required|exists:room_types,id',
            'room_number' => [
                'required',
                'string',
                'max:50',
                Rule::unique('rooms')->where(function ($query) use ($request, $room) {
                    return $query->where('hotel_id', $request->hotel_id)
                                 ->where('id', '!=', $room->id);
                }),
            ],
            'floor_number' => 'required|integer|min:1',
            'status' => 'required|in:available,occupied,maintenance,cleaning',
        ]);

        $room->update($validated);
        return response()->json(new RoomResource($room));
    }

    /**
     * Display available rooms.
     */
    public function available(): JsonResponse
    {
        $availableRooms = Room::where('status', 'available')->get();
        return response()->json(RoomResource::collection($availableRooms));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room): JsonResponse
    {
        $room->delete();
        return response()->json(['message' => 'Room deleted successfully']);
    }
}
