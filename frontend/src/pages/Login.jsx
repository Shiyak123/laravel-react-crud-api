import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email");
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
                password,
            });

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/students");
        } catch (error) {
            console.log(error);

            if (error.response) {
                setError(
                    error.response.data.message ||
                    "Invalid email or password."
                );
            } else {
                setError(
                    "Unable to connect to the server."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">

                {/* Left Branding Section */}
                <div className="login-brand">

                    <div className="brand-icon">
                        🎓
                    </div>

                    <h1>
                        Student Management
                    </h1>

                    <p>
                        Manage students efficiently,
                        securely, and effortlessly.
                    </p>

                    <div className="brand-features">
                        <div>
                            <span>✓</span>
                            Easy student management
                        </div>

                        <div>
                            <span>✓</span>
                            Secure authentication
                        </div>

                        <div>
                            <span>✓</span>
                            Fast and reliable
                        </div>
                    </div>

                </div>

                {/* Login Card */}
                <div className="login-card">

                    <div className="login-header">

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Sign in to your account
                            to continue
                        </p>

                    </div>

                    {error && (
                        <div className="login-error">
                            <span>⚠</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                disabled={loading}
                            />

                        </div>

                        {/* Password */}
                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="password-wrapper">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(
                                            e.target.value
                                        );
                                        setError("");
                                    }}
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    disabled={loading}
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                    </form>

                    <p className="login-footer">
                        Student Management System
                    </p>

                </div>

            </div>
        </div>
    );
}

export default Login;

