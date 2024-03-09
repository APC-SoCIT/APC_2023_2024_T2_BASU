<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
    public function get()
    {
        // Retrieve all reservations
        $reservations = Reservation::all();
        return response()->json($reservations);
    }

    public function create(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'reason' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'landmark' => 'required|string',
            'passenger' => 'nullable|string',
            'status' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
        ]);

        // Create new reservation
        $reservation = Reservation::create($validatedData);

        return response()->json($reservation, 201);
    }

    public function show($id)
    {
        // Find reservation by ID
        $reservation = Reservation::findOrFail($id);
        return response()->json($reservation);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'reason' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'landmark' => 'required|string',
            'passenger' => 'nullable|string',
            'status' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
        ]);

        // Find reservation by ID and update
        $reservation = Reservation::findOrFail($id);
        $reservation->update($validatedData);

        return response()->json($reservation, 200);
    }

    public function delete($id)
    {
        // Find reservation by ID and delete
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json(null, 204);
    }
}
