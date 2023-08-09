import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AuthStatus, User } from 'core/models';
import { getCurrentUser } from '../api';
import { setNotAuthorized, setAuthorized, selectAuthStatus } from '../slices';

export const useCheckAuthorization = (
    onSuccess: () => void,
) => {
    const dispatch = useDispatch();
    const authStatus = useSelector(selectAuthStatus);
    useEffect(() => {
        getCurrentUser().then(
            (user: User) => {
                dispatch(setAuthorized(user));
            },
            () => {
                dispatch(setNotAuthorized());
            });
    }, [dispatch]);

    useEffect(() => {
        if (authStatus === AuthStatus.AUTHORIZED) {
            onSuccess();
        }
    }, [authStatus, onSuccess]);

    return authStatus === AuthStatus.LOADING;
};