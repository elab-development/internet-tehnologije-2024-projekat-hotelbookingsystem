<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
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
            'hotel_name' => $this->hotel_name,
            'address' => $this->address,
            'city' => $this->city,
            'country' => $this->country,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'rooms' => RoomResource::collection($this->whenLoaded('rooms')),
            'reservations' => ReservationResource::collection($this->whenLoaded('reservations')),
        ];
    }
}
