import axios from '../axios';

export const apiGetPosts = params =>
    axios({
        url: '/posts',
        method: 'get',
        params,
    });
