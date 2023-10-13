import React from 'react';
import { Filter } from '../../components/filter';
import icons from '../../ultils/icons';

const Search = () => {
    const { BsHouseHeart, IoLocationOutline, IoPricetagsOutline, BsTextareaResize, BiSearchAlt, MdKeyboardArrowRight } =
        icons;
    return (
        <div className="w-main mt-[10px] flex items-center justify-around p-[8px] bg-[#febb02] rounded-lg shadow-xl">
            <Filter
                iconRight={<MdKeyboardArrowRight />}
                icon={<BsHouseHeart size={12} />}
                title={'Phòng trọ nhà trọ'}
            />
            <Filter iconRight={<MdKeyboardArrowRight />} icon={<IoLocationOutline size={12} />} title={'Toàn quốc'} />
            <Filter iconRight={<MdKeyboardArrowRight />} icon={<IoPricetagsOutline size={12} />} title={'Chọn giá'} />
            <Filter
                iconRight={<MdKeyboardArrowRight />}
                icon={<BsTextareaResize size={12} />}
                title={'Chọn diện tích'}
            />
            <div className="min-w-[208px] flex items-center justify-center bg-main p-[8px] rounded-md hover:shadow-xl cursor-pointer text-white">
                <div className="flex items-center">
                    <span className="mr-[5px]">{<BiSearchAlt />}</span>
                    <span className="text-[14px]">Tìm kiếm</span>
                </div>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Search;
