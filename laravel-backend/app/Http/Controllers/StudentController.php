<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // Read all students
    public function index()
    {
        return Student::all();
    }

    // Create a student
    public function store(Request $request)
    {
        $student = Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'course' => $request->course,
        ]);

        return response()->json($student, 201);
    }

    // Read one student
    public function show(string $id)
    {
        return Student::findOrFail($id);
    }

    // Update a student
    public function update(Request $request, string $id)
    {
        $student = Student::findOrFail($id);

        $student->update([
            'name' => $request->name,
            'email' => $request->email,
            'course' => $request->course,
        ]);

        return response()->json($student);
    }

    // Delete a student
    public function destroy(string $id)
    {
        $student = Student::findOrFail($id);

        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully'
        ]);
    }
}
