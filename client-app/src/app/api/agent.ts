import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../../index';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running');
    }
    const { status, config } = error.response;
    if (status === 404 && config.method === 'get') {
        history.push('/not-found');
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for error info!')
    }
    throw error;
})

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (respons: AxiosResponse) => {
    return new Promise<AxiosResponse>(resolve => setTimeout(() => {
        resolve(respons)
    }, (ms)));
}

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string): Promise<IActivity> => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
}

export default {
    Activities
}