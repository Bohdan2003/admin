import { useDispatch } from "react-redux";
import { removeToken } from "../pages/loginSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { api } from "../../api";


export const Error = ({error = null}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(error?.status == 401) {
            dispatch(removeToken());
            // dispatch(api.util.resetApiState());
            navigate('/login');
        }       
    }, [error])

    return <div className="error">{error?.data?.code || 'Error'}</div>
}