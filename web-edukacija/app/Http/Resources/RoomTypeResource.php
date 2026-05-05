<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
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
            'room_type_name' => $this->room_type_name,
            'capacity' => $this->capacity,
            'price_per_night' => $this->price_per_night,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'rooms' => RoomResource::collection($this->whenLoaded('rooms')),
        ];
    }
}
