import axios from '../axios';

export const apiGetPosts = () =>
    axios({
        url: '/posts',
        method: 'get',
    });
