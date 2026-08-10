import api from "./api";

const API_URL = "http://127.0.0.1:8000/api/students";

// Get all students
export const getStudents = (page = 1, search = "") => {
    return api.get(
        `/students?page=${page}&search=${encodeURIComponent(search)}`
    );
};

// Get one student
export const getStudent = (id) => {
    return api.get(`/students/${id}`);
};

// Create student
export const createStudent = (student) => {
    return api.post("/students", student);
};

// Update student
export const updateStudent = (id, student) => {
    return api.put(`/students/${id}`, student);

};

// Delete student
export const deleteStudent = (id) => {
    return api.delete(
        `/students/${id}`
    );

};

