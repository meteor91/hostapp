import React from 'react';
import { CheckAuthorization } from 'modules/Auth/components/CheckAuthorization';
import { LoginPage } from 'modules/Auth/LoginPage';
import { LoggedLayout } from 'modules/Auth/components/LoggedLayout';
import { MFComponent } from 'core/moduleFederation/MFComponent';

const loggedRoutes = [
    {
        path: '/home',
        element: <div>home</div>,
    },
    {
        path: '/app2',
        element: (
            <MFComponent
                url="http://localhost:8080/remoteEntry.js"
                scope="app2"
                module='./App'
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
                element: <LoggedLayout />,
                children: loggedRoutes,
            },
        ],
    },
];