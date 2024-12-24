import envConfig from "../config";

type CustomOptions = RequestInit & {
    baseUrl?: string | undefined;
}

class HttpError extends Error {
    status: number;
    payload: any;

    constructor({ status, payload }: { status: number; payload: any }) {
        super('Http Error');
        this.status = status;
        this.payload = payload;
    }
}

const request = async<Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const baseHeaders = {
        'Content-Type': 'application/json',
    };

    //Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_DEV_URL
    //Nếu truyền baseUrl thì lấy từ baseUrl
    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_DEV_URL : options.baseUrl;

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        },
        body,
        method,
    })
    const payload: Response = await res.json();
    // const data = {
    //     status: res.status,
    //     payload,
    // }

    // if (!res.ok) {
    //     throw new HttpError(data);
    // }
    return payload;
}

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, options);
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('POST', url, { ...options, body });
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('PUT', url, { ...options, body });
    },
    delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('DELETE', url, { ...options, body });
    }
}

export default http;