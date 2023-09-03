import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Error = ({error = null}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(error?.status == 401) {
            navigate('/login');
        }       
    }, [error])

    return <div className="error">{error?.data?.code || 'Error'}</div>
}