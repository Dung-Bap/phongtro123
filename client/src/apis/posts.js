import axios from '../axios';

export const apiGetPosts = params =>
    axios({
        url: '/posts',
        method: 'get',
        params,
    });

export const apiGetNews = () =>
    axios({
        url: '/posts/news',
        method: 'get',
    });
