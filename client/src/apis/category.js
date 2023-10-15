import axios from '../axios';

export const apiGetCategory = () =>
    axios({
        url: '/category',
        method: 'get',
    });
