
import { useState, useEffect } from "react";
import {
    createStudent,
    updateStudent
} from "../services/studentService";


function StudentForm({ refreshStudents, selectedStudent }) {


    const [student, setStudent] = useState({

        name: "",
        email: "",
        course: ""

    });


    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);



    useEffect(() => {

        if (selectedStudent) {

            setStudent(selectedStudent);

        }

    }, [selectedStudent]);



    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

        // Clear previous error
        setError("");

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        // Frontend validation

        if (!student.name.trim()) {

            setError("Name is required");

            return;

        }


        if (!student.email.trim()) {

            setError("Email is required");

            return;

        }


        if (!student.email.includes("@")) {

            setError("Please enter a valid email");

            return;

        }


        if (!student.course.trim()) {

            setError("Course is required");

            return;

        }



        try {

            // Start loading
            setLoading(true);


            if (selectedStudent) {

                await updateStudent(

                    selectedStudent.id,

                    student

                );

                alert("Student updated successfully");

            }

            else {

                await createStudent(student);

                alert("Student added successfully");

            }



            setStudent({

                name: "",
                email: "",
                course: ""

            });


            setError("");


            refreshStudents();


        }

        catch (error) {

            console.log(error);

            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Something went wrong."
                );

            }
            else {

                setError(
                    "Unable to connect to the server."
                );

            }

        }
        finally {

            // Stop loading
            setLoading(false);

        }

    };



    return (

        <form onSubmit={handleSubmit}>


            <h2>

                {selectedStudent
                    ? "Update Student"
                    : "Add Student"}

            </h2>



            {error && (

                <p>

                    {error}

                </p>

            )}



            <input

                name="name"

                placeholder="Name"

                value={student.name}

                onChange={handleChange}

            />



            <input

                name="email"

                placeholder="Email"

                type="email"

                value={student.email}

                onChange={handleChange}

            />



            <input

                name="course"

                placeholder="Course"

                value={student.course}

                onChange={handleChange}

            />



            <button

                type="submit"

                disabled={loading}

            >

                {loading

                    ? "Saving..."

                    : selectedStudent

                        ? "Update"

                        : "Save"}

            </button>


        </form>

    );

}


export default StudentForm;

