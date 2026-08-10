import { useState, useEffect } from "react";

import {
    createStudent,
    updateStudent
} from "../services/studentService";

function StudentForm({
    refreshStudents,
    selectedStudent,
    clearSelectedStudent
}) {


    const [student, setStudent] = useState({
        name: "",
        email: "",
        course: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (selectedStudent) {

            setStudent({
                name: selectedStudent.name || "",
                email: selectedStudent.email || "",
                course: selectedStudent.course || ""
            });

        }

    }, [selectedStudent]);

    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

        setError("");

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!student.name.trim()) {
            setError("Name is required");
            return;
        }

        if (student.name.trim().length < 2) {
            setError("Name must be at least 2 characters");
            return;
        }

        if (!student.email.trim()) {
            setError("Email is required");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(student.email)) {
            setError("Please enter a valid email");
            return;
        }

        if (!student.course.trim()) {
            setError("Course is required");
            return;
        }

        if (student.course.trim().length < 2) {
            setError("Course must be at least 2 characters");
            return;
        }

        try {

            setLoading(true);

            if (selectedStudent) {

                await updateStudent(
                    selectedStudent.id,
                    student
                );

            } else {

                await createStudent(student);

            }

            setStudent({
                name: "",
                email: "",
                course: ""
            });

            setError("");

            if (selectedStudent) {
                clearSelectedStudent();
            }

            await refreshStudents();

        } catch (error) {

            console.log(error);

            if (error.response) {

                if (error.response.status === 422) {

                    const validationErrors =
                        error.response.data.errors;

                    if (validationErrors) {

                        const firstError =
                            Object.values(validationErrors)[0][0];

                        setError(firstError);

                    } else {

                        setError(
                            "Please check your input."
                        );

                    }

                } else {

                    setError(
                        error.response.data.message ||
                        "Failed to save student."
                    );

                }

            } else {

                setError(
                    "Unable to connect to the server."
                );

            }

        } finally {

            setLoading(false);

        }

    };

    const handleCancel = () => {

        setStudent({
            name: "",
            email: "",
            course: ""
        });

        setError("");

        clearSelectedStudent();

    };

    return (

        <div className="student-form-wrapper">

            <div className="form-header">

                <div className="form-icon">
                    {selectedStudent ? "✏️" : "＋"}
                </div>

                <div>

                    <h2>
                        {selectedStudent
                            ? "Update Student"
                            : "Add New Student"}
                    </h2>

                    <p>
                        {selectedStudent
                            ? "Update the student's information below."
                            : "Enter the student's details to create a new record."}
                    </p>

                </div>

            </div>


            {error && (

                <div className="form-error">
                    {error}
                </div>

            )}


            <form
                onSubmit={handleSubmit}
                className="student-form"
            >

                <div className="form-field">

                    <label htmlFor="name">
                        Student Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter student name"
                        value={student.name}
                        onChange={handleChange}
                        disabled={loading}
                    />

                </div>


                <div className="form-field">

                    <label htmlFor="email">
                        Email Address
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="student@example.com"
                        value={student.email}
                        onChange={handleChange}
                        disabled={loading}
                    />

                </div>


                <div className="form-field">

                    <label htmlFor="course">
                        Course
                    </label>

                    <input
                        id="course"
                        name="course"
                        type="text"
                        placeholder="Enter course name"
                        value={student.course}
                        onChange={handleChange}
                        disabled={loading}
                    />

                </div>


                <div className="form-actions">

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : selectedStudent
                                ? "Update Student"
                                : "Add Student"}

                    </button>


                    {selectedStudent && (

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                    )}

                </div>

            </form>

        </div>

    );


}

export default StudentForm;
