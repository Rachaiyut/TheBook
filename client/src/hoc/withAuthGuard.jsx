import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withAuthGuard = (WrappedComponent) => {
    const HOC = (props) => {
        const { token } = useSelector((state) => state.auth);
        const navigate = useNavigate();

        useEffect(() => {
            if (!token) {
                navigate('/');
            }
        }, [token, navigate]);

        return token ? <WrappedComponent {...props} /> : null;
    };

    // HOC.displayName = `withAuthGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return HOC;
};

export default withAuthGuard;
