<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'hotel_id' => $this->hotel_id,
            'room_type_id' => $this->room_type_id,
            'room_number' => $this->room_number,
            'floor_number' => $this->floor_number,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'hotel' => HotelResource::make($this->whenLoaded('hotel')),
            'room_type' => RoomTypeResource::make($this->whenLoaded('roomType')),
            'reservations' => ReservationResource::collection($this->whenLoaded('reservations')),
        ];
    }
}
