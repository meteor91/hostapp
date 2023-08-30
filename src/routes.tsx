import React from 'react';
import { MFComponent } from 'core/moduleFederation/MFComponent';
import { ModuleProps } from 'core/models';
import { CheckAuthorization } from 'modules/Auth/components/CheckAuthorization';
import { LoginPage } from 'modules/Auth/LoginPage';
import { AuthorizedLayout } from 'modules/Auth/components/AuthorizedLayout';
import { Home } from 'modules/Home/pages/Home';

const authorizedRoutes = [
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/orders/*',
        element: (
            <MFComponent<ModuleProps>
                url="http://localhost:8080/remoteEntry.js"
                scope="Orders"
                module='./App'
                moduleProps={{
                    basename: '/orders',
                }}
            />
        ),
    },
];

export const routes = [
    {
        path: '/',
        element: <CheckAuthorization onSuccessRedirectPath="/home" onFailRedirectPath="/login" />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/',
                element: <AuthorizedLayout />,
                children: authorizedRoutes,
            },
        ],
    },
];