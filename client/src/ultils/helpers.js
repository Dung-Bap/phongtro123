import icons from './icons';

const { AiOutlineStar, AiFillStar } = icons;

export const renderStars = (number, size) => {
    if (!Number(number)) return;
    const stars = [];
    number = Math.round(number);
    for (let i = 0; i < +number; i++) stars.push(<AiFillStar color="orange" size={size || 18} />);
    for (let i = 5; i > +number; i--) stars.push(<AiOutlineStar color="orange" size={size || 18} />);

    return stars;
};
