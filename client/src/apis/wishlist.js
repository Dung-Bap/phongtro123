import axios from '../axios';

export const apiAddWishlist = data =>
    axios({
        url: '/wishlist/',
        method: 'post',
        data,
    });
