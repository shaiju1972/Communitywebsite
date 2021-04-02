import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const API_URL = process.env.API_URL || 'http://175.41.176.135:3000';

let storage;
if (typeof window !== "undefined") {
    storage = localStorage;
}

const removeStorage=()=>{
    storage.removeItem('auth');
    storage.removeItem('myCommunity');
}

export const setAxios = (): void => {
	// Add a request interceptor
	axios.interceptors.request.use((config: AxiosRequestConfig) => {

		// set auth token

        let authToken = '';
        if (typeof window !== "undefined") {
            authToken = JSON.parse(storage.getItem('auth'))
        }
		if (authToken) {
			authToken = authToken['token'];
		}
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }
        return config;

	}, function (error) {
		// Do something with request error
		return Promise.reject(error)
	})

	// axios response interceptor
	axios.interceptors.response.use(function (response: AxiosResponse) {
		// Do something with response data
		return response;
	}, function (error: AxiosError) {
		switch (error.response?.status) {
			case 400:
				// Bad Request
				break;
			case 401:
				// Unauthorized
				// clear local storage data, then redirect to login screen
				// storage.clearAll();

				removeStorage()
				// window.location.href = `${userTypeEntered}/auth/login`;
				window.location.href = `${window.location.host}`;
				break;
			case 403:
				// Forbidden
				// clear local storage, then redirect to login screen
				// storage.clearAll();

				removeStorage()
				// window.location.href = `${userTypeEntered}/auth/login`;
				window.location.href = `${window.location.host}`;
				break;
			case 404:
				// Not Found
				// show 404 or page not found page
				break;
			case 405:
				// Method Not Allowed
				// show error page
				break;
			case 408:
				// Request Timeout
				break;
			case 409:
				// Conflict
				break;
			case 429:
				// Too Many Requests
				break;
			case 500:
				// show error page
				break;
			case 501:
				// Not Implemented
				break;
			case 502:
				// Bad Gateway
				break;
			case 503:
				// Service Unavailable
				break;
			case 504:
				// Gateway Timeout
				break;
			case 505:
				// HTTP Version Not Supported
				break;
			case 598:
				// Network read timeout error
				break;
			case 599:
				// Network connect timeout error
				break;
			default:
				// alert(error)
				break;
		}
		// Do something with response error
		return Promise.reject(error)
	})
}

export const get = (url: string): Promise<object> => axios.get(url);

export const getApi = (url: string): Promise<object> => axios.get(`${API_URL}${url}`);

export const postApi = (url: string, data?: object): Promise<object> => axios.post(`${API_URL}${url}`, data);

export const putApi = (url: string, data?: object): Promise<object> => axios.put(`${API_URL}${url}`, data);

export const deleteApi = (url: string): Promise<object> => axios.delete(`${API_URL}${url}`);
