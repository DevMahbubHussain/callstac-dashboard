<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return response()->json($query->orderBy('created_at', 'desc')->paginate(20));
    }

    public function show($id)
    {
        $customer = Customer::with(['calls' => function ($query) {
            $query->orderBy('started_at', 'desc')->limit(50);
        }])->findOrFail($id);

        return response()->json($customer);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string|unique:customers,phone',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'company' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $customer = Customer::create($request->all());

        return response()->json($customer, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|string',
            'phone' => 'sometimes|string|unique:customers,phone,' . $id,
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'company' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $customer = Customer::findOrFail($id);
        $customer->update($request->all());

        return response()->json($customer);
    }
}
