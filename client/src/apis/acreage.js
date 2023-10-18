import axios from '../axios';

export const apiGetAcreages = () =>
    axios({
        url: '/acreages',
        method: 'get',
    });
