import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";


function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        // Frontend validation
        if (!email.trim()) {

            setError("Email is required");

            return;

        }


        if (!password.trim()) {

            setError("Password is required");

            return;

        }


        try {

            setLoading(true);


            const response = await loginUser({

                email,
                password

            });


            // Save JWT token
            localStorage.setItem(
                "token",
                response.data.token
            );


            console.log("Login successful");


            // Go to Students page
            navigate("/students");

        }


        catch (error) {

            console.log(error);


            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Login failed."
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


    return (

        <form onSubmit={handleLogin}>

            <h2>
                Login
            </h2>


            {/* Error message */}

            {error && (

                <p>
                    {error}
                </p>

            )}


            <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e) => {

                    setEmail(e.target.value);

                    setError("");

                }}

            />


            <input

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e) => {

                    setPassword(e.target.value);

                    setError("");

                }}

            />


            <button

                type="submit"

                disabled={loading}

            >

                {loading
                    ? "Logging in..."
                    : "Login"}

            </button>


        </form>

    );

}


export default Login;

