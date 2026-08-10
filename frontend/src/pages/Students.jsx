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

    const [showForm, setShowForm] = useState(false);


    // ================================
    // Logout
    // ================================

    const handleLogout = () => {

        logoutUser();

        navigate("/login");

    };


    // ================================
    // Load students
    // ================================

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


    // ================================
    // Initial load
    // ================================

    useEffect(() => {

        loadStudents(
            currentPage,
            appliedSearch
        );

    }, [currentPage, appliedSearch]);


    // ================================
    // Delete student
    // ================================

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this student?"
            )
        ) {
            return;
        }

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

    };


    // ================================
    // Search
    // ================================

    const handleSearch = () => {

        setCurrentPage(1);

        setAppliedSearch(
            searchInput.trim()
        );

    };


    // ================================
    // Clear search
    // ================================

    const handleClear = () => {

        setSearchInput("");

        setAppliedSearch("");

        setCurrentPage(1);

    };


    // ================================
    // Pagination
    // ================================

    const handlePageChange = (page) => {

        if (
            page >= 1 &&
            page <= totalPages
        ) {

            setCurrentPage(page);

        }

    };


    // ================================
    // Add student
    // ================================

    const handleAddStudent = () => {

        setSelectedStudent(null);

        setShowForm(true);

    };


    // ================================
    // Edit student
    // ================================

    const handleEditStudent = (student) => {

        setSelectedStudent(student);

        setShowForm(true);

    };


    // ================================
    // Close form
    // ================================

    const handleCloseForm = () => {

        setShowForm(false);

        setSelectedStudent(null);

    };


    return (

        <div className="dashboard">


            {/* =================================
                HEADER
            ================================= */}

            <header className="dashboard-header">

                <div className="header-brand">

                    <div className="header-logo">
                        🎓
                    </div>

                    <div>

                        <h1>
                            Student Management
                        </h1>

                        <span>
                            Administration Dashboard
                        </span>

                    </div>

                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >

                    <span>
                        ⇥
                    </span>

                    Logout

                </button>

            </header>


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <main className="dashboard-content">


                {/* Page heading */}

                <div className="page-heading">

                    <div>

                        <h2>
                            Students
                        </h2>

                        <p>
                            Manage student information and records.
                        </p>

                    </div>


                    <button
                        className="add-student-button"
                        onClick={handleAddStudent}
                    >

                        <span>
                            +
                        </span>

                        Add Student

                    </button>

                </div>


                {/* =================================
                    STATISTICS
                ================================= */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon">
                            👨‍🎓
                        </div>

                        <div>

                            <span>
                                Students
                            </span>

                            <strong>
                                {loading
                                    ? "..."
                                    : students.length}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            📄
                        </div>

                        <div>

                            <span>
                                Current Page
                            </span>

                            <strong>
                                {currentPage}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            📚
                        </div>

                        <div>

                            <span>
                                Total Pages
                            </span>

                            <strong>
                                {totalPages}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    STUDENT TABLE CARD
                ================================= */}

                <section className="students-card">


                    {/* Search header */}

                    <div className="students-card-header">

                        <div>

                            <h3>
                                Student Records
                            </h3>

                            <p>
                                Search and manage student information.
                            </p>

                        </div>


                        <div className="search-container">

                            <div className="search-input-wrapper">

                                <span>
                                    🔎
                                </span>

                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={(e) => {

                                        if (
                                            e.key === "Enter"
                                        ) {

                                            handleSearch();

                                        }

                                    }}
                                />

                            </div>


                            <button
                                className="search-button"
                                onClick={handleSearch}
                            >
                                Search
                            </button>


                            {appliedSearch && (

                                <button
                                    className="clear-button"
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>

                            )}

                        </div>

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="dashboard-error">

                            <span>
                                !
                            </span>

                            {error}

                        </div>

                    )}


                    {/* =================================
                        TABLE
                    ================================= */}

                    <div className="table-wrapper">

                        <table className="students-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>


                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="table-message"
                                        >

                                            <div className="table-loader">

                                                <span className="spinner"></span>

                                                Loading students...

                                            </div>

                                        </td>

                                    </tr>

                                )


                                    : students.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="table-message"
                                            >

                                                <div className="empty-state">

                                                    <div>
                                                        📋
                                                    </div>

                                                    <h4>
                                                        No students found
                                                    </h4>

                                                    <p>

                                                        {appliedSearch
                                                            ? "Try changing your search."
                                                            : "Add your first student to get started."}

                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    )


                                        : (

                                            students.map(
                                                (student) => (

                                                    <tr
                                                        key={
                                                            student.id
                                                        }
                                                    >

                                                        <td>

                                                            <span className="student-id">

                                                                #
                                                                {student.id}

                                                            </span>

                                                        </td>


                                                        <td>

                                                            <div className="student-name">

                                                                <div className="student-avatar">

                                                                    {student.name
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        ?.toUpperCase()}

                                                                </div>

                                                                <strong>

                                                                    {student.name}

                                                                </strong>

                                                            </div>

                                                        </td>


                                                        <td>

                                                            {student.email}

                                                        </td>


                                                        <td>

                                                            <span className="course-badge">

                                                                {student.course}

                                                            </span>

                                                        </td>


                                                        <td>

                                                            <div className="action-buttons">

                                                                <button
                                                                    className="edit-button"
                                                                    onClick={() =>
                                                                        handleEditStudent(
                                                                            student
                                                                        )
                                                                    }
                                                                >

                                                                    ✏️

                                                                    <span>
                                                                        Edit
                                                                    </span>

                                                                </button>


                                                                <button
                                                                    className="delete-button"
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
                                                                        ? "..."
                                                                        : "🗑️"}

                                                                    {deletingId !==
                                                                        student.id && (
                                                                            <span>
                                                                                Delete
                                                                            </span>
                                                                        )}

                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )
                                            )

                                        )}

                            </tbody>

                        </table>

                    </div>


                    {/* =================================
                        PAGINATION
                    ================================= */}

                    {!loading &&
                        students.length > 0 && (

                            <div className="pagination-container">

                                <div className="page-info">

                                    Page{" "}
                                    <strong>
                                        {currentPage}
                                    </strong>{" "}
                                    of{" "}
                                    <strong>
                                        {totalPages}
                                    </strong>

                                </div>


                                <div className="pagination">

                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                currentPage -
                                                1
                                            )
                                        }
                                        disabled={
                                            currentPage ===
                                            1
                                        }
                                    >
                                        ←
                                    </button>


                                    {Array.from(
                                        {
                                            length:
                                                totalPages
                                        },
                                        (_, index) => (

                                            <button
                                                key={
                                                    index +
                                                    1
                                                }
                                                className={
                                                    currentPage ===
                                                        index +
                                                        1
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handlePageChange(
                                                        index +
                                                        1
                                                    )
                                                }
                                            >

                                                {index +
                                                    1}

                                            </button>

                                        )
                                    )}


                                    <button
                                        onClick={() =>
                                            handlePageChange(
                                                currentPage +
                                                1
                                            )
                                        }
                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }
                                    >
                                        →
                                    </button>

                                </div>

                            </div>

                        )}

                </section>

            </main>


            {/* =================================
                ADD / EDIT MODAL
            ================================= */}

            {showForm && (

                <div
                    className="modal-overlay"
                    onClick={handleCloseForm}
                >

                    <div
                        className="student-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="modal-close"
                            onClick={handleCloseForm}
                        >
                            ×
                        </button>


                        <StudentForm

                            refreshStudents={async () => {

                                await loadStudents(
                                    currentPage,
                                    appliedSearch
                                );

                            }}

                            selectedStudent={
                                selectedStudent
                            }

                            clearSelectedStudent={
                                handleCloseForm
                            }

                        />

                    </div>

                </div>

            )}

        </div>

    );

}

export default Students;