import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentForm from "../components/StudentForm";

import {
    getStudents,
    deleteStudent
} from "../services/studentService";

import {
    logoutUser
} from "../services/authService";


function Students() {

    const navigate = useNavigate();


    const [students, setStudents] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [loading, setLoading] = useState(false);

    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");


    // Logout Function
    const handleLogout = () => {

        logoutUser();

        navigate("/login");

    };


    // Fetch students from Laravel API
    const loadStudents = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getStudents();

            setStudents(response.data);

        }

        catch (error) {

            console.log(error);

            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Failed to load students."
                );

            }

            else {

                setError(
                    "Unable to connect to the server."
                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    // Delete student
    const handleDelete = async (id) => {

        if (
            confirm(
                "Are you sure you want to delete this student?"
            )
        ) {

            try {

                setDeletingId(id);

                setError("");

                await deleteStudent(id);

                await loadStudents();

            }

            catch (error) {

                console.log(error);

                if (error.response) {

                    setError(
                        error.response.data.message ||
                        "Failed to delete student."
                    );

                }

                else {

                    setError(
                        "Unable to connect to the server."
                    );

                }

            }

            finally {

                setDeletingId(null);

            }

        }

    };


    // Load students when page opens
    useEffect(() => {

        loadStudents();

    }, []);


    return (

        <div>

            <h1>
                Student Management System
            </h1>


            <button onClick={handleLogout}>
                Logout
            </button>


            <StudentForm

                refreshStudents={loadStudents}

                selectedStudent={selectedStudent}

                clearSelectedStudent={() =>
                    setSelectedStudent(null)
                }

            />


            <h2>
                Student List
            </h2>


            {/* Error message */}

            {error && (

                <p>
                    {error}
                </p>

            )}


            <table
                border="1"
                cellPadding="10"
            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Course</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {loading ? (

                        <tr>

                            <td colSpan="5">
                                Loading students...
                            </td>

                        </tr>

                    )

                        : students.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    No students found.
                                </td>

                            </tr>

                        )

                            : (

                                students.map(student => (

                                    <tr key={student.id}>

                                        <td>
                                            {student.id}
                                        </td>

                                        <td>
                                            {student.name}
                                        </td>

                                        <td>
                                            {student.email}
                                        </td>

                                        <td>
                                            {student.course}
                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    setSelectedStudent(student)
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDelete(student.id)
                                                }
                                                disabled={
                                                    deletingId === student.id
                                                }
                                            >
                                                {deletingId === student.id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                </tbody>

            </table>

        </div>

    );

}


export default Students;

