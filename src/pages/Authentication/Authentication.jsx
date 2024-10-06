import React, { useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import './Authentication.css';
import { toast } from 'react-toastify';

const Authentication = () => {
    const { login, register, verify, authenticated, otpSent } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const from = location.state?.from || "/";

    const resetValues = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setOtp('');
    };

    const validateFields = () => {
        // Common validation rules
        if (email.length > 32) {
            toast.warn('Email cannot exceed 32 characters');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/.test(email) || /(?:\.[a-zA-Z]{2,}){2,}/.test(email.split('@')[1])) {
            toast.warn('Invalid email format');
            return false;
        }
        if (password.length > 32) {
            toast.warn('Password cannot exceed 32 characters');
            return false;
        }
        if (/\s/.test(password)) {
            toast.warn('Password cannot contain spaces');
            return false;
        }

        if (otpSent) {
            // OTP validation
            if (otp.length !== 6) {
                toast.warn('OTP must be exactly 6 digits');
                return false;
            }
            if (!/^\d+$/.test(otp)) {
                toast.warn('OTP must only contain numbers');
                return false;
            }
        }

        if (isRegistering) {
            // Registration-specific validation
            if (username.length > 32) {
                toast.warn('Username cannot exceed 32 characters');
                return false;
            }
            if (!/^[A-Za-z]+$/.test(username)) {
                toast.warn('Username must only contain alphabets');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Run validations
        if (!validateFields()) return;

        try {
            if (otpSent) {
                await verify(email, otp);
                navigate(from);
            } else if (isRegistering) {
                await register(username, email, password);
            } else {
                await login(email, password);
            }
        } catch (error) {
            showError(error);
        }
    };

    const showError = (error) => {
        console.log(error);
        const errorMessage = error.message || 'Something went wrong';
        const colonIndex = errorMessage.indexOf(':');
        const finalMessage = colonIndex !== -1 ? errorMessage.slice(colonIndex + 1).trim() : errorMessage;
        toast.error(finalMessage);
    };

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
        resetValues();
    };

    if (authenticated) {
        return <Navigate to={from} replace />;
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2 className="auth-title">
                    {otpSent ? "Verify OTP" : isRegistering ? "Register" : "Login"}
                </h2>
                <p className="auth-subtitle">
                    {otpSent
                        ? "Please enter the OTP sent to your email to verify your account."
                        : "Manage your inventory"}
                </p>
                <form onSubmit={handleSubmit} className="auth-form">
                    {otpSent ? (
                        <>
                            <label htmlFor="otp" className="auth-label">
                                OTP:
                            </label>
                            <input
                                type="tel"
                                id="otp"
                                value={otp}
                                onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                                className="otp-input"
                                maxLength="6"
                                pattern="\d*"
                                required
                            />
                        </>
                    ) : isRegistering ? (
                        <>
                            <label htmlFor="username" className="auth-label">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                className="auth-input"
                                required
                            />
                            <label htmlFor="email" className="auth-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="auth-input"
                                required
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="email" className="auth-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="auth-input"
                                required
                            />
                        </>
                    )}
                    {!otpSent && (
                        <>
                            <label htmlFor="password" className="auth-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="auth-input"
                                required
                            />
                        </>
                    )}
                    <button type="submit" className="auth-button">
                        {otpSent ? "Verify OTP" : isRegistering ? "Register" : "Login"}
                    </button>
                    {!otpSent && (
                        <p className="auth-toggle">
                            {isRegistering
                                ? "Already have an account?"
                                : "Don't have an account?"}
                            <span onClick={toggleRegister} className="auth-link">
                                {isRegistering ? " Login" : " Register"}
                            </span>
                        </p>
                    )}
                </form>
                <div className="image-credit">
                    Image by <a href="https://pixabay.com/users/heungsoon-4523762/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2464609">HeungSoon</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2464609">Pixabay</a>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
