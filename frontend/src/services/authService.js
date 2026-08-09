import api from "./api";

export const loginUser = async (userData) => {

    return await api.post(
        "/login",
        userData
    );

};
export const logoutUser = () => {

    localStorage.removeItem("token");

};

