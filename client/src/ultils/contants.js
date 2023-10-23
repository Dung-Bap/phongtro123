import { path } from './path';
import icons from './icons';

const { BsPostcardHeart, MdOutlineManageSearch, BiUserPin, BsBalloonHeart } = icons;

export const MENUMANAGE = [
    {
        id: 1,
        icon: <BsPostcardHeart />,
        des: 'Đăng tin cho thuê',
        path: `/${path.MANAGE}/${path.NEW_POST}`,
    },
    {
        id: 2,
        icon: <MdOutlineManageSearch />,
        des: 'Quản lý tin đăng',
        path: `/${path.MANAGE}/${path.MANAGE_POST}`,
    },
    {
        id: 3,
        icon: <BiUserPin />,
        des: 'Thông tin cá nhân',
        path: `/${path.MANAGE}/${path.PERSONAL}`,
    },
    {
        id: 4,
        icon: <BsBalloonHeart />,
        des: 'Tin đã lưu',
        path: `/${path.MANAGE}/${path.WISHLIST}`,
    },
];
