import axios from "axios";
import { useEffect, useState } from "react";
import AuthContext from "./authContext";
import React from 'react';

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const url_login = "http://localhost:8800/api/auth/login";
    const login = async (inputs) => {
        const res = await axios.post(url_login, inputs);
        setCurrentUser(res.data)
    }

    // const url_logout = "http://localhost:8800/api/auth/logout";
    const logout = async (inputs) => {
        await axios.post("http://localhost:8800/api/auth/logout");
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider