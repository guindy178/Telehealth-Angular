export type Res<T = any> = {
    status: boolean;
    message: string;
    data: T;
}
