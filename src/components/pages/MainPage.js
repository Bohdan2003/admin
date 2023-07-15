import { lazy, Suspense, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Header } from "../header/Header";

const Store = lazy(() => import('../store/Store'))
const Stock = lazy(() => import('../stock/Stock'))
const Report = lazy(() => import('../report/Report'))

export const MainPage = () => {

    const activeSection = useSelector(state => state.menu.activeSection);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!localStorage.getItem("token")) navigate("/login");
    }, [])

    const setContent = () => {
        switch (activeSection) {
            case 'store': return <Store/>
            case 'stock': return <Stock/>
            case 'report': return <Report/>
        }
    }

    const content = setContent()

    return (
        <div className="container">
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                {content}
            </Suspense>
        </div>
    )
}