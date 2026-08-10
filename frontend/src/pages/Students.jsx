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

    const [searchInput, setSearchInput] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");


    // Logout
    const handleLogout = () => {

        logoutUser();

        navigate("/login");

    };


    // Load students from Laravel API
    const loadStudents = async (
        page = currentPage,
        searchValue = appliedSearch
    ) => {

        try {

            setLoading(true);

            setError("");

            const response = await getStudents(
                page,
                searchValue
            );

            setStudents(response.data.data);

            setCurrentPage(response.data.current_page);

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


    // Load students when page or search changes
    useEffect(() => {

        loadStudents(
            currentPage,
            appliedSearch
        );

    }, [currentPage, appliedSearch]);


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

                await loadStudents(
                    currentPage,
                    appliedSearch
                );

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


    // Search
    const handleSearch = () => {

        setCurrentPage(1);

        setAppliedSearch(
            searchInput.trim()
        );

    };


    // Clear search
    const handleClear = () => {

        setSearchInput("");

        setAppliedSearch("");

        setCurrentPage(1);

    };


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


            {/* Logout */}

            <button onClick={handleLogout}>
                Logout
            </button>


            {/* Student Form */}

            <StudentForm

                refreshStudents={() =>
                    loadStudents(
                        currentPage,
                        appliedSearch
                    )
                }

                selectedStudent={
                    selectedStudent
                }

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

                    value={searchInput}

                    onChange={(e) =>
                        setSearchInput(
                            e.target.value
                        )
                    }

                />


                <button

                    type="button"

                    onClick={handleSearch}

                >
                    Search

                </button>


                <button

                    type="button"

                    onClick={handleClear}

                >
                    Clear

                </button>

            </div>


            {/* Error */}

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

                                    {appliedSearch
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
                                                    setSelectedStudent(
                                                        student
                                                    )
                                                }

                                            >
                                                Edit
                                            </button>


                                            <button

                                                onClick={() =>
                                                    handleDelete(
                                                        student.id
                                                    )
                                                }

                                                disabled={
                                                    deletingId ===
                                                    student.id
                                                }

                                            >

                                                {deletingId ===
                                                    student.id

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
                        handlePageChange(
                            currentPage - 1
                        )
                    }

                    disabled={
                        currentPage === 1
                    }

                >
                    Previous
                </button>


                {Array.from(

                    {
                        length: totalPages
                    },

                    (_, index) => (

                        <button

                            type="button"

                            key={index + 1}

                            onClick={() =>
                                handlePageChange(
                                    index + 1
                                )
                            }

                            disabled={
                                currentPage ===
                                index + 1
                            }

                        >

                            {index + 1}

                        </button>

                    )

                )}


                <button

                    type="button"

                    onClick={() =>
                        handlePageChange(
                            currentPage + 1
                        )
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