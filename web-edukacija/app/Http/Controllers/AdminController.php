<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Resources\AdminCollection;
use App\Http\Resources\AdminResource;
use Dotenv\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admin = Admin::all();

        return new AdminCollection($admin);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'password' => 'required|min:8',
        ]);

        $admin = Admin::create($validatedData);

        return response()->json(['Admin created successfully', new AdminResource($admin)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        return new AdminResource($admin);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $admin = Auth::admin();
        $updateAdmin = Admin::find($admin->id);

        $validatedData = $request->validate([
            'username' => 'sometimes|string|max:255',
            'password' => 'sometimes|string|min:8'
        ]);

        $updateAdmin->update($validatedData);
        return response()->json(['message' => 'Admin updated successfully', 'Admin:' => new AdminResource($updateAdmin)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }
        $admin->delete();

        return response()->json(['message' => 'Admin deleted successfully']);
    }
}
