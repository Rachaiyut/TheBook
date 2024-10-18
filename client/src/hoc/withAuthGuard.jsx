import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthGuard = (WrappedComponent) => {
    const HOC = (props) => {
        const token = localStorage.getItem('token');
        const navigate = useNavigate();

        useEffect(() => {
            if (!token) {
                navigate('/');
            }
        }, [token, navigate]);

        return token ? <WrappedComponent {...props} /> : null;
    };

    return HOC;
};

export default withAuthGuard;
