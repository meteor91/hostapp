import { render } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'core/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { matchRequestUrl, MockedRequest } from 'msw';
import { server } from '../setupTests';


const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
    },
});

export function renderWithAppContext(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient();
    const history = createMemoryHistory();
    history.push = jest.fn();

    const { rerender, ...result } = render(
        <ReduxProvider store={store}>
            <QueryClientProvider client={testQueryClient}>
                <Router location={history.location} navigator={history}>
                    {ui}
                </Router>
            </QueryClientProvider>
        </ReduxProvider>,
    );
    return {
        ...result,
        history,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <ReduxProvider store={store}>
                    <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
                </ReduxProvider>,
            ),
    };
}

export function waitForRequest(method: string, url: string) {
    let requestId = '';

    return new Promise<MockedRequest>((resolve, reject) => {
        server.events.on('request:start', (req) => {
            const matchesMethod = req.method.toLowerCase() === method.toLowerCase();
            const matchesUrl = matchRequestUrl(req.url, url).matches;

            if (matchesMethod && matchesUrl) {
                requestId = req.id;
            }
        });

        server.events.on('request:match', (req) => {
            if (req.id === requestId) {
                resolve(req);
            }
        });

        server.events.on('request:unhandled', (req) => {
            if (req.id === requestId) {
                reject(
                    new Error(`The ${req.method} ${req.url.href} request was unhandled.`),
                );
            }
        });
    });
}
