<?php

namespace App\Events;

use App\Models\Location;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LocationUpdate implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $location;

    public function __construct(Location $location)
    {
        $this->location = $location;
    }

    public function broadcastOn()
    {
        return new Channel('location-channel');
    }

    public function broadcastAs()
    {
        return 'location.updated';
    }

    public function broadcastWith()
    {
        return [
            'latitude' => $this->location->latitude,
            'longitude' => $this->location->longitude,
            // Add more data if needed
        ];
    }
}
