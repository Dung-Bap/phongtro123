import * as request from '../ultils/request';

export const getProvinces = async () => {
    try {
        const res = await request.get('province');
        return res.results;
    } catch (error) {
        console.log(error);
    }
};

export const getDistricts = async id => {
    try {
        const res = await request.get(`province/district/${id}`);
        return res.results;
    } catch (error) {
        console.log(error);
    }
};
