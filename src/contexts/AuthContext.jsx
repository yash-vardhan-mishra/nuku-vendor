import React, { createContext, useState, useEffect } from "react";
import { loginVendor, registerVendor, verifyOtp } from "../services/authentication";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");                
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            await loginVendor(email, password);
            setOtpSent(true);
        } catch (error) {
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            await registerVendor(username, email, password);
            setOtpSent(true);
        } catch (error) {
            throw error;
        }
    };

    const verify = async (email, otp) => {
        try {
            const response = await verifyOtp(email, otp);
            setAuthenticated(true);
            setOtpSent(false);
            localStorage.setItem("token", response.token);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, register, verify, otpSent, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
