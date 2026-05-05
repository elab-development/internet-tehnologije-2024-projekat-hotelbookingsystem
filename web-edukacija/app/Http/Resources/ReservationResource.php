<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            'user_id' => $this->user_id,
            'room_id' => $this->room_id,
            'reservation_code' => $this->reservation_code,
            'reservation_status' => $this->reservation_status,
            'check_in_date' => $this->check_in_date,
            'check_out_date' => $this->check_out_date,
            'guest_count' => $this->guest_count,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => UserResource::make($this->whenLoaded('user')),
            'room' => RoomResource::make($this->whenLoaded('room')),
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
        ];
    }
}
