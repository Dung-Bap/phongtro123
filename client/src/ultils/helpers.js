import icons from './icons';

const { AiOutlineStar, AiFillStar } = icons;

export const convertStringToNumberAcreage = string => {
    return Math.ceil(string.match(/\d+/)[0]);
};

export const convertStringToNumberPrice = string => {
    if (string.search('triệu/tháng') !== -1)
        // eslint-disable-next-line no-useless-escape
        return Math.ceil(parseFloat(string.replace(/[^\d\.]*/g, ''))) * Math.pow(10, 6);
    // eslint-disable-next-line no-useless-escape
    return Math.ceil(parseFloat(string.replace(/[^\d\.]*/g, '')));
};

export const renderStars = (number, size) => {
    if (!Number(number)) return;
    const stars = [];
    number = Math.round(number);
    for (let i = 0; i < +number; i++) stars.push(<AiFillStar color="orange" size={size || 18} />);
    for (let i = 5; i > +number; i--) stars.push(<AiOutlineStar color="orange" size={size || 18} />);

    return stars;
};

export const convertPath = string => {
    return string
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-')
        .toLowerCase();
};

export const convertToBase64 = file => {
    if (!file) return '';
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = error => {
            reject(error);
        };
    });
};
