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

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const studentsPerPage = 10;

    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
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
    const loadStudents = async (page = currentPage) => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getStudents(page, searchQuery);

            // Laravel pagination returns students inside data.data
            setStudents(response.data.data);

            // Laravel provides the total number of pages
            setTotalPages(response.data.last_page);

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

                await loadStudents(currentPage);

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

        loadStudents(currentPage);

    }, [currentPage, searchQuery]);


    // Change page
    const handlePageChange = (page) => {

        if (
            page >= 1 &&
            page <= totalPages
        ) {

            setCurrentPage(page);

        }

    };


    return (

        <div>

            <h1>
                Student Management System
            </h1>


            <button onClick={handleLogout}>
                Logout
            </button>


            <StudentForm

                refreshStudents={() =>
                    loadStudents(currentPage)
                }

                selectedStudent={selectedStudent}

                clearSelectedStudent={() =>
                    setSelectedStudent(null)
                }

            />


            <h2>
                Student List
            </h2>


            {/* Search */}

            <div>

                <input

                    type="text"

                    placeholder="Search by name, email or course"

                    value={search}

                    onChange={(e) => {

                        setSearch(e.target.value);

                        setCurrentPage(1);

                    }}

                />


                <button
                    type="button"
                    onClick={() => {

                        setSearchQuery(search.trim());

                        setCurrentPage(1);

                    }}
                >
                    Search
                </button>


                <button
                    type="button"
                    onClick={() => {

                        setSearch("");

                        setSearchQuery("");

                        setCurrentPage(1);

                    }}
                >
                    Clear
                </button>

            </div>


            {/* Error message */}

            {error && (

                <p>
                    {error}
                </p>

            )}


            {/* Students Table */}

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

                                    {search
                                        ? "No matching students found."
                                        : "No students found."}

                                </td>

                            </tr>

                        )

                            : (

                                students.map((student) => (

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


            {/* Pagination */}

            <div>

                <button

                    type="button"

                    onClick={() =>
                        handlePageChange(currentPage - 1)
                    }

                    disabled={currentPage === 1}

                >
                    Previous

                </button>


                {Array.from(
                    { length: totalPages },
                    (_, index) => (

                        <button

                            type="button"

                            key={index + 1}

                            onClick={() =>
                                handlePageChange(index + 1)
                            }

                            disabled={
                                currentPage === index + 1
                            }

                        >

                            {index + 1}

                        </button>

                    )
                )}


                <button

                    type="button"

                    onClick={() =>
                        handlePageChange(currentPage + 1)
                    }

                    disabled={
                        currentPage === totalPages ||
                        totalPages === 0
                    }

                >
                    Next

                </button>

            </div>


            {/* Page Information */}

            <p>
                Page {currentPage} of {totalPages}
            </p>

        </div>

    );

}

export default Students;

