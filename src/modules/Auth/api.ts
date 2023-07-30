import { type User } from 'core/models';
import { get, post } from 'core/http';
import { type LoginForm } from '../models';

export const getCurrentUser = (): Promise<User> => get<User>('/users/current-user/');

export const loginUser = (loginForm: LoginForm): Promise<User> => post<LoginForm, User>(
    '/users/login/',
    loginForm,
);

export const logoutUser = (): Promise<void> => post('/users/logout/');
