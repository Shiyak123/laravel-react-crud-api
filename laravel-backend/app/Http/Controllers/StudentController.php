<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


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
        // Backend validation
        $validated = $request->validate([

            'name' => 'required|string|min:2',

            'email' => [
                'required',
                'email',
                'unique:students,email'
            ],

            'course' => 'required|string|min:2',

        ]);


        $student = Student::create($validated);


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


        // Backend validation
        $validated = $request->validate([

            'name' => 'required|string|min:2',

            'email' => [
                'required',
                'email',
                Rule::unique('students', 'email')
                    ->ignore($student->id)
            ],

            'course' => 'required|string|min:2',

        ]);


        $student->update($validated);


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


