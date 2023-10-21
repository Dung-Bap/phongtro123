import React, { memo, useState } from 'react';
import { Filter } from '../../components/filter';
import icons from '../../ultils/icons';
import withBaseComp from '../../hocs/withBaseComp';
import { showModal } from '../../store/app/appSlice';
import { ModalSearch } from '../../components/modal';
import { useSelector } from 'react-redux';

const Search = ({ currentPageRef, dispatch }) => {
    const {
        BsHouseHeart,
        IoLocationOutline,
        IoPricetagsOutline,
        BsTextareaResize,
        BiSearchAlt,
        MdKeyboardArrowRight,
        RiDeleteBack2Line,
    } = icons;
    const { categories, provinces } = useSelector(state => state.app);
    const [checkValue, setCheckValue] = useState({
        categoryCode: 'CTPT',
        provinceCode: '',
    });
    const checkValueCategory = categories.find(item => item.code === checkValue.categoryCode)?.value;
    const checkValueProvince = provinces.find(item => item.code === checkValue.provinceCode)?.value;

    console.log(checkValue);

    const handleClickSearch = (e, value) => {
        e.stopPropagation();
        if (value === 'loại bất động sản') {
            dispatch(
                showModal({
                    isShowModal: true,
                    childrenModal: (
                        <ModalSearch
                            setCheckValue={setCheckValue}
                            contents={categories}
                            title={'CHỌN LOẠI BẤT ĐỘNG SẢN'}
                            type={'categoryCode'}
                            checkValue={checkValueCategory}
                        />
                    ),
                })
            );
        }
        if (value === 'tỉnh thành') {
            dispatch(
                showModal({
                    isShowModal: true,
                    childrenModal: (
                        <ModalSearch
                            setCheckValue={setCheckValue}
                            contents={provinces}
                            title={'CHỌN TỈNH THÀNH'}
                            type={'provinceCode'}
                            checkValue={checkValueProvince}
                        />
                    ),
                })
            );
        }
    };

    return (
        <div ref={currentPageRef} className="w-full flex justify-center">
            <div className="w-main mt-[10px] mb-[15px] flex items-center justify-around p-[8px] bg-[#febb02] rounded-lg shadow-xl">
                <div onClick={e => handleClickSearch(e, 'loại bất động sản')}>
                    <Filter
                        iconRight={
                            categories.some(item => item.code === checkValue.categoryCode) ? (
                                <RiDeleteBack2Line />
                            ) : (
                                <MdKeyboardArrowRight />
                            )
                        }
                        icon={<BsHouseHeart size={12} />}
                        title={checkValueCategory}
                        checkValue={checkValueCategory}
                        setCheckValue={setCheckValue}
                        type={'categotyCode'}
                    />
                </div>
                <div onClick={e => handleClickSearch(e, 'tỉnh thành')}>
                    <Filter
                        iconRight={
                            provinces.some(item => item.code === checkValue.provinceCode) ? (
                                <RiDeleteBack2Line />
                            ) : (
                                <MdKeyboardArrowRight />
                            )
                        }
                        icon={<IoLocationOutline size={12} />}
                        title={checkValueProvince || 'Toàn quốc'}
                        checkValue={checkValueProvince}
                        setCheckValue={setCheckValue}
                        type={'provinceCode'}
                    />
                </div>
                <div onClick={e => handleClickSearch(e, 'giá')}>
                    <Filter
                        iconRight={<MdKeyboardArrowRight />}
                        icon={<IoPricetagsOutline size={12} />}
                        title={'Chọn giá'}
                    />
                </div>
                <div onClick={e => handleClickSearch(e, 'diện tích')}>
                    <Filter
                        iconRight={<MdKeyboardArrowRight />}
                        icon={<BsTextareaResize size={12} />}
                        title={'Chọn diện tích'}
                    />
                </div>
                <div className="min-w-[208px] flex items-center justify-center bg-main p-[8px] rounded-md hover:shadow-xl cursor-pointer text-white">
                    <div className="flex items-center">
                        <span className="mr-[5px]">{<BiSearchAlt />}</span>
                        <span className="text-[14px]">Tìm kiếm</span>
                    </div>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default withBaseComp(memo(Search));
