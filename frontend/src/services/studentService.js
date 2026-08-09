import api from "./api";

const API_URL = "http://127.0.0.1:8000/api/students";

// Get all students
export const getStudents = () => {
    return api.get("/students");
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

