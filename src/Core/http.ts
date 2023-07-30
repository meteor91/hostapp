import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { clearAuthorized } from '../Modules/Auth/slices';
import { store } from './store';

const http = axios.create({
    baseURL: '/api',
    headers: {
        'Content-type': 'application/json',
    },
    withCredentials: true,
});

http.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            store.dispatch(clearAuthorized());
        }
        return Promise.reject(error);
    },
);

/**
 * POST-запрос, возвращает ответ с бекенда.
 *
 * @param url URL реста.
 * @param [data] Тело запроса.
 */
export const post = <T, R = T>(url: string, data?: T): Promise<R> => {
    return http.post(url, data).then(
        (result: AxiosResponse<R>) => result.data,
        onAxiosError,
    );
};

/**
 * PUT-запрос
 *
 * @param url URL реста.
 * @param [data] Тело запроса.
 */
export const put = <T, R = T>(url: string, data?: T): Promise<R> => {
    return http.put(url, data).then(
        (result: AxiosResponse<R>) => result.data,
        onAxiosError,
    );
};

/**
 * DELETE-запрос
 *
 * @param url URL реста.
 */
export const del = <T, R = T>(url: string): Promise<R> => {
    return http.delete(url).then(
        (result: AxiosResponse<R>) => result.data,
        onAxiosError,
    );
};

/**
 * GET-запрос
 *
 * @param url URL реста.
 */
export const get = <R>(url: string): Promise<R> => {
    return http.get(url).then(
        (result: AxiosResponse<R>) => result.data,
        onAxiosError,
    );
};

const onAxiosError = <R>(result: AxiosError<R>) => {
    if (result.response) {
        return Promise.reject(result.response.data);
    } else {
        return Promise.reject({
            code: 'server_unreachable',
        });
    }
};