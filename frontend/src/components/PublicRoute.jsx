import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {

    const token = localStorage.getItem("token");

    console.log("PublicRoute is running");
    console.log("Token:", token);

    if (token) {

        console.log("Token exists → redirecting to /students");

        return <Navigate to="/students" replace />;

    }

    console.log("No token → showing Login");

    return children;
}

export default PublicRoute;