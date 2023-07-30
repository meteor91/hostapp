export type ServerValidateErrors<T> = {
    [K in keyof Partial<T>]: string[];
} & {
    nonFieldErrors?: string[]
};

export interface User {
    username: string
    id: string
}
