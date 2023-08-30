export type ServerValidateErrors<T> = {
    [K in keyof Partial<T>]: string[];
} & {
    nonFieldErrors?: string[]
};

export interface User {
    username: string
    id: string
}

export enum AuthStatus {
    LOADING = 'LOADING',
    AUTHORIZED = 'AUTHORIZED',
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
}

export interface ModuleProps {
    basename: string
}