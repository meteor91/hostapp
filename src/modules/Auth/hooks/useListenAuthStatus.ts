import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthStatus } from 'core/models';
import { selectAuthStatus } from '../slices';

export const useListenAuthStatus = () => {
    const navigate = useNavigate();
    const authStatus = useSelector(selectAuthStatus);

    useEffect(() => {
        if (authStatus === AuthStatus.NOT_AUTHORIZED) {
            const navigateTo = location.pathname === '/login'
                ? '/login'
                : `/login?redirectTo=${location.pathname}`;
            navigate(navigateTo);
        }
    }, [authStatus, navigate]);
};
