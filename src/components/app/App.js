import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setToken } from "../pages/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";

export const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            dispatch(setToken(token));
        } else {
            navigate("/login")
        }
    }, [])

    return (
        <Routes>
            <Route path="/" element={<MainPage/>} /> 
            <Route path="/login" element={<LoginPage/>} /> 
        </Routes>
    )
}