import axios from 'axios';
import router from '../router'

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT
});

// interceptor to catch errors
const errorInterceptor = (error) => {
    if (error.response && !error.response.status) {
        // network error
        console.error(error.response);
    } else if (error.response && error.response.status) {
        // all the error responses
        switch (error.response.status) {
            case 400:
                console.error('400: Data not found');
                break;
            case 404:
                console.error('404: Data not found');
                router.push('/')
                break;
            case 500:
                console.error('500: Server Error');
                break;
        }
    } else if (error.message) {
        console.error('Server Error');
    } else if (error.error_description) {
        console.error(error.error_description);
    } else {
        console.error('Internal Error')
    }

    return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response) => {
    switch (response.status) {
        case 200:
            break;
        default:
    }

    return response;
};

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor)

export default httpClient