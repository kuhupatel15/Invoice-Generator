import React, { useEffect,ReactNode, ReactElement } from 'react'
// import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: ReactElement }> = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        let login = localStorage.getItem('token');
        if (!login) {
            // toast.error("Login first to access !!")
            navigate('/')
        }
    }, [])
    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute;