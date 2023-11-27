import React, { memo, useState } from 'react';
import { Filter } from '../../components/filter';
import icons from '../../ultils/icons';
import withBaseComp from '../../hocs/withBaseComp';
import { showModal } from '../../store/app/appSlice';
import { ModalSearch } from '../../components/modal';
import { useSelector } from 'react-redux';
import { createSearchParams } from 'react-router-dom';

const Search = ({ currentPageRef, dispatch, navigate, location, setUpdate }) => {
    const {
        BsHouseHeart,
        IoLocationOutline,
        IoPricetagsOutline,
        BsTextareaResize,
        BiSearchAlt,
        MdKeyboardArrowRight,
        RiDeleteBack2Line,
    } = icons;
    const { categories, provinces, prices, acreages } = useSelector(state => state.app);
    const [checkValue, setCheckValue] = useState({
        categoryCode: 'CTPT',
    });
    const checkValueCategory = categories.find(item => item.code === checkValue.categoryCode)?.value;
    const checkValueProvince = provinces.find(item => item.code === checkValue.provinceCode)?.value;
    const checkValuePrice = prices.find(item => item.code === checkValue.priceCode)?.value;
    const checkValueAcreage = acreages.find(item => item.code === checkValue.acreageCode)?.value;

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
                            currentValue={checkValue}
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
        if (value === 'giá') {
            dispatch(
                showModal({
                    isShowModal: true,
                    childrenModal: (
                        <ModalSearch
                            setCheckValue={setCheckValue}
                            contents={prices}
                            title={'GIÁ'}
                            type={'priceCode'}
                            checkValue={checkValuePrice}
                        />
                    ),
                })
            );
        }
        if (value === 'diện tích') {
            dispatch(
                showModal({
                    isShowModal: true,
                    childrenModal: (
                        <ModalSearch
                            setCheckValue={setCheckValue}
                            contents={acreages}
                            title={'DIỆN TÍCH'}
                            type={'acreageCode'}
                            checkValue={checkValueAcreage}
                        />
                    ),
                })
            );
        }
    };

    const handleSearchParams = () => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams(checkValue).toString(),
        });
        setUpdate(prev => !prev);
    };

    return (
        <div ref={currentPageRef} className="w-full flex justify-center">
            <div className="w-main pt-[50px] lg:pt-[8px] mt-[10px] mb-[15px] lg:flex items-center justify-around p-[8px] bg-[#febb02] rounded-lg shadow-xl">
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
                        iconRight={
                            prices.some(item => item.code === checkValue.priceCode) ? (
                                <RiDeleteBack2Line />
                            ) : (
                                <MdKeyboardArrowRight />
                            )
                        }
                        icon={<IoPricetagsOutline size={12} />}
                        title={checkValuePrice || 'Chọn giá'}
                        checkValue={checkValuePrice}
                        setCheckValue={setCheckValue}
                        type={'priceCode'}
                    />
                </div>
                <div onClick={e => handleClickSearch(e, 'diện tích')}>
                    <Filter
                        iconRight={
                            acreages.some(item => item.code === checkValue.acreageCode) ? (
                                <RiDeleteBack2Line />
                            ) : (
                                <MdKeyboardArrowRight />
                            )
                        }
                        icon={<BsTextareaResize size={12} />}
                        title={checkValueAcreage || 'Chọn diện tích'}
                        checkValue={checkValueAcreage}
                        setCheckValue={setCheckValue}
                        type={'acreageCode'}
                    />
                </div>
                <div
                    onClick={handleSearchParams}
                    className="min-w-[208px] flex items-center justify-center bg-main p-[8px] rounded-md hover:shadow-xl cursor-pointer text-white"
                >
                    <div className="flex items-center">
                        <span className="mr-[5px]">{<BiSearchAlt />}</span>
                        <span className="text-[14px]">Tìm kiếm</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withBaseComp(memo(Search));
