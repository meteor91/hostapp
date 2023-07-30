import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthFlag } from '../components/CheckAuthorization';

export const useAuthorizeLost = () => {
    const navigate = useNavigate();
    const isAuthorized = useSelector(selectAuthFlag);
    const isAuthorizedRef = useRef(isAuthorized);

    useEffect(() => {
        if (!isAuthorized && isAuthorizedRef.current) {
            const navigateTo = location.pathname === '/login'
                ? '/login'
                : `/login?redirectTo=${location.pathname}`;
            navigate(navigateTo);
        }
        isAuthorizedRef.current = isAuthorized;
    }, [isAuthorized, navigate]);
};