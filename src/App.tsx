import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from 'core/store';
import { queryClient } from 'core/queryClient';
import 'styles/base.less';
import { routes } from './routes';

const router = createBrowserRouter(routes);

export const App: React.FC = () => {
    return (
        <div className="keepd">
            <ReduxProvider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ReduxProvider>
        </div>
    );
};

// window.ww = __webpack_share_scopes__;
