<?php

namespace App\Http\Controllers;

use App\Models\CallDisposition;
use Illuminate\Http\Request;

class CallDispositionController extends Controller
{
    public function index()
    {
        $dispositions = CallDisposition::active()->get();
        return response()->json($dispositions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'category' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $disposition = CallDisposition::create($request->all());

        return response()->json($disposition, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|string',
            'category' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $disposition = CallDisposition::findOrFail($id);
        $disposition->update($request->all());

        return response()->json($disposition);
    }
}
