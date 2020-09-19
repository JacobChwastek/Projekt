import axios from 'axios';
import { response } from './components/constants/dictionaries';

export const api = axios.create({
    baseURL: `/`,
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if(error.response) {
            if(error.response.status === response.UNAUTHORIZED) {
                //Display error about session timeout
            }
        }

        return Promise.reject(error);
    }
)
