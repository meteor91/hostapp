import React, { useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'keepd';
import { useCheckAuthorization } from '../hooks/useCheckAuthorization';

const doNotRedirectHereOnSuccessAuth = ['/', '/login'];

interface Props {
    onSuccessRedirectPath: string;
    onFailRedirectPath: string;
}

export const CheckAuthorization = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const onSuccess = useCallback(() => {
        const path = doNotRedirectHereOnSuccessAuth.some((path: string) => path === location.pathname)
            ? props.onSuccessRedirectPath
            : location.pathname;
        navigate(path);
    }, [props.onSuccessRedirectPath, navigate]);

    const isLoading = useCheckAuthorization(onSuccess);

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
