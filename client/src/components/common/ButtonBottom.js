import React, { memo } from 'react';
import Button from '../../components/common/Button';
import icons from '../../ultils/icons';
import withBaseComp from '../../hocs/withBaseComp';

const ButtonBottom = ({ valueEditPost, navigate, update = false }) => {
    const { IoMdArrowRoundBack } = icons;
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex items-center justify-between">
            <div onClick={handleBack} className="flex items-center p-2 border rounded-md gap-2 lg:hidden">
                <IoMdArrowRoundBack />
                <span>Quay lại</span>
            </div>
            {!update ? (
                <Button primary>{valueEditPost ? 'Cập nhật' : 'Tiếp tục'}</Button>
            ) : (
                <Button primary>Lưu & Cập nhật</Button>
            )}
        </div>
    );
};

export default withBaseComp(memo(ButtonBottom));
