import axios from '../axios';

export const apiGetProvinces = () =>
    axios({
        url: '/provinces',
        method: 'get',
    });
