import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'keepd';
import { TAppState } from 'core/store';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuthorizeLost } from '../hooks/useAuthorizeLost';

const doNotRedirectHereOnSuccessAuth = ['/', '/login'];

interface Props {
    onSuccessRedirectPath: string;
    onFailRedirectPath: string;
}

export const CheckAuthorization = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoading = useCurrentUser(
        () => {
            const path = doNotRedirectHereOnSuccessAuth.some((path: string) => path === location.pathname)
                ? props.onSuccessRedirectPath
                : location.pathname;
            navigate(path);            
        },
        () => {
            navigate(
                doNotRedirectHereOnSuccessAuth.some((path: string) => path === location.pathname)
                    ? props.onFailRedirectPath
                    : `${props.onFailRedirectPath}?redirectTo=${location.pathname}`,
            );
        },
    );

    useAuthorizeLost();

    if (isLoading) {
        return (
            <Spin spinning={true}>
                <div style={{ width: '100vh', height: '100vh' }}/>
            </Spin>
        );
    } else {
        return <Outlet />;
    }
};

export const selectAuthFlag = (state: TAppState) => state.auth.authorized;
