import React from 'react';
import { rest } from 'msw';
import { DeferredPromise } from '@open-draft/deferred-promise';
import { renderWithAppContext, waitForRequest } from '../../../tests/utils';
import { server } from 'setupTests';
import { LoginPage } from '../LoginPage';
import { fireEvent, screen, waitFor } from '@testing-library/react';

describe('login page', () => {

    test('login fail', async () => {
        const responsePromise = new DeferredPromise();

        server.use(
            rest.post('api/users/login/', async (req, res, ctx) => {
                await responsePromise;
                return res(ctx.status(400), ctx.json({
                    nonFieldErrors: ['error'],
                }));
            }),
        );

        renderWithAppContext(<LoginPage />);

        fireEvent.input(screen.getByLabelText(/Username/), {
            target: { value: 'test' },
        });

        fireEvent.input(screen.getByLabelText(/Password/), {
            target: { value: 'test' },
        });

        fireEvent.submit(screen.getByText(/Submit/));

        await waitFor(() => {
            expect(screen.getByLabelText(/Username/)).toBeDisabled();
            expect(screen.getByLabelText(/Password/)).toBeDisabled();
            expect(screen.getByText(/Submit/)).toBeDisabled();
            responsePromise.resolve(true);
        });

        expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });

    test('login success', async () => {
        const loginData = {
            username: 'test',
            password: 'test',
        };

        const login = waitForRequest('POST', 'api/users/login/');

        server.use(
            rest.post('api/users/login/', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({
                    username: 'test',
                    dateJoined: '2023-07-08T11:29:43.824489Z',
                    role: 'BASIC',
                }));
            }),
        );

        const { history } = renderWithAppContext(
            <LoginPage />,
        );

        fireEvent.input(screen.getByLabelText(/Username/), {
            target: { value: loginData.username },
        });

        fireEvent.input(screen.getByLabelText(/Password/), {
            target: { value: loginData.password },
        });

        fireEvent.submit(screen.getByText(/Submit/));

        await waitFor(() => {
            expect(history.push).toHaveBeenCalledWith(
                {
                    hash: '',
                    pathname: '/home',
                    search: '',
                },
                undefined,
                {},
            );
        });

        const request = await login;

        expect(await request.json()).toEqual(loginData);
    });
});