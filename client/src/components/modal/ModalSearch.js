import React, { memo } from 'react';
import icons from '../../ultils/icons';
import withBaseComp from '../../hocs/withBaseComp';
import { showModal } from '../../store/app/appSlice';
import { SelectRadio } from '../input';

const ModalSearch = ({ title, dispatch, contents, setCheckValue, type, checkValue }) => {
    const { MdKeyboardArrowLeft } = icons;
    return (
        <div onClick={e => e.stopPropagation()} className="w-full lg:w-[700px] mx-5 bg-white rounded-lg shadow-lg">
            <div className="flex justify-center relative border-b">
                <h1 className="font-semibold p-[12px]">{title}</h1>
                <span
                    onClick={() => dispatch(showModal({ isShowModal: false, childrenModal: null }))}
                    className="absolute top-[8px] left-[10px] cursor-pointer"
                >
                    <MdKeyboardArrowLeft size={30} />
                </span>
            </div>
            <div className="px-[20px] h-[400px] overflow-y-auto">
                {contents?.map(content => (
                    <SelectRadio
                        key={content.code}
                        value={content.code}
                        des={content.value}
                        setCheckValue={setCheckValue}
                        type={type}
                        checkValue={checkValue}
                    />
                ))}
            </div>
        </div>
    );
};

export default withBaseComp(memo(ModalSearch));
