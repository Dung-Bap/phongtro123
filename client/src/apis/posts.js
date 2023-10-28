import axios from '../axios';

export const apiGetPosts = params =>
    axios({
        url: '/posts',
        method: 'get',
        params,
    });

export const apiGetPostsManage = params =>
    axios({
        url: '/posts/manage',
        method: 'get',
        params,
    });

export const apiGetNews = () =>
    axios({
        url: '/posts/news',
        method: 'get',
    });

export const apiCreatePost = data =>
    axios({
        url: '/posts/create',
        method: 'post',
        data,
    });
