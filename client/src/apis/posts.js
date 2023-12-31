import axios from '../axios';

export const apiGetPost = id =>
    axios({
        url: '/posts/' + id,
        method: 'get',
    });

export const apiGetPosts = params =>
    axios({
        url: '/posts',
        method: 'get',
        params,
    });

export const apiUpdatePost = data =>
    axios({
        url: '/posts/update',
        method: 'put',
        data,
    });

export const apiDestroyPost = data =>
    axios({
        url: '/posts/destroy',
        method: 'delete',
        data,
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
