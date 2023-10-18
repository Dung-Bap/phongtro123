import axios from '../axios';

export const apiGetPrices = () =>
    axios({
        url: '/prices',
        method: 'get',
    });
