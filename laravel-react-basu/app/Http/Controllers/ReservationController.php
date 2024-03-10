<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\User;

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
            'passengers' => 'required|array',
            'passengers.*.id' => 'required|int', // Assuming each passenger has an 'id'
            'passengers.*.name' => 'required|string', // Assuming each passenger has a 'name'
            'reason' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'landmark' => 'required|string',
            'status' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
        ]);

        // Extract passenger IDs
        $passengerIds = collect($validatedData['passengers'])->pluck('id')->toArray();

        // Create new reservation
        $reservation = new Reservation([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'passengers' => json_encode($passengerIds), // Store passenger IDs as JSON
            'reason' => $validatedData['reason'],
            'description' => $validatedData['description'],
            'location' => $validatedData['location'],
            'landmark' => $validatedData['landmark'],
            'status' => $validatedData['status'],
            'start_time' => $validatedData['start_time'],
            'end_time' => $validatedData['end_time'],
        ]);

        $reservation->save();

        // Convert passenger IDs to emails for response
        $passengerEmails = User::whereIn('id', $passengerIds)->pluck('email')->toArray();
        $reservation->passengers = $passengerEmails;

        return response()->json($reservation, 201);
    }

    public function show($id)
    {
        // Find reservation by ID
        $reservation = Reservation::findOrFail($id);

        // Convert passenger IDs to emails for response
        $passengerIds = json_decode($reservation->passengers);
        $passengerEmails = User::whereIn('id', $passengerIds)->pluck('email')->toArray();
        $reservation->passengers = $passengerEmails;

        return response()->json($reservation);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'passengers' => 'required|array',
            'reason' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'landmark' => 'required|string',
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
