import { lazy, Suspense, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Header } from "../header/Header";
import { ReactComponent as LoadingIcon } from "../../assets/loading-big.svg";

const Store = lazy(() => import('../store/Store'))
const Stock = lazy(() => import('../stock/Stock'))
const Report = lazy(() => import('../report/Report'))

export const MainPage = () => {

    const activeSection = useSelector(state => state.header.activeSection);    

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
            <Suspense 
                fallback={
                    <div 
                        style={{
                            height:'100vh',
                            display:'grid',
                            placeItems:'center'
                        }}
                    ><LoadingIcon/></div>
                }
            >
                {content}
            </Suspense>
        </div>
    )
}