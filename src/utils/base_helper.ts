import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from "../Env";
import { Constants } from '../constant/constants';

// Enum for HTTP Methods
export enum Authorization {
    TOKEN, NONE, AUTH,
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class BaseHelper {
    // Token retrieval function
    private static async _token(): Promise<string | null> {
        // Example: Retrieve the token from localStorage (you could change this if needed)
        const token = localStorage.getItem('auth_token');

        // If no token is found, return null or handle accordingly (maybe throw an error)
        if (!token) {
            console.warn('No token found in localStorage');
            return null;
        }

        return token;  // Return the token
    }

    // Helper to generate the URL
    private static url(endPoint: string): string {
        return `${ENV.API}/api/${endPoint}`;
    }

    // Helper to set default headers
    private static async defaultHeader(auth: Authorization): Promise<AxiosRequestConfig['headers']> {
        const headers: AxiosRequestConfig['headers'] = {
            'Content-Type': 'application/json; charset=UTF-8',
        };

        // If the auth type is TOKEN, add Authorization header with token
        if (auth === Authorization.TOKEN) {
            const token = await this._token();  // You would need to implement _token() to get the auth token
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }


    // Main function for network requests
    public static async onNetworkRequesting(
        {
            auth,
            endPoint,
            method,
            body
        }: {
            auth: Authorization;
            endPoint: string;
            method: Method;
            body?: any
        }
    ): Promise<any> {
        const url = this.url(endPoint);
        const headers = await this.defaultHeader(auth);

        const config: AxiosRequestConfig = {
            method: method,
            url: url,
            headers: headers,
        };

        if (body && (method === Method.POST || method === Method.PUT)) {
            config.data = body;  // For POST/PUT, add data to the request
            console.log('body', body);
        }

        try {
            // Execute the request
            const response: AxiosResponse = await axios(config);

            // Return the response data
            return response.data;
        } catch (error) {
            // Handle the error, you can customize the error response as needed
            if (axios.isAxiosError(error)) {
                console.error('API request failed', error.response?.data || error.message);
                return { error: 'Request failed', details: error.response?.data || error.message };
            } else {
                console.error('Unknown error', error);
                return { error: 'Unknown error', details: error };
            }
        }
    }
}
