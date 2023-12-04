import clsx from 'clsx';
import React, { memo } from 'react';
import { useSearchParams } from 'react-router-dom';

const SelectProvinceItem = ({ title, image, setSearchProvince, cateCode }) => {
    const [searchProvince] = useSearchParams();
    return (
        <div
            onClick={() => setSearchProvince({ title, cateCode })}
            className={clsx(
                searchProvince.get('provinceCode') === cateCode && 'text-secondary',
                'w-[220px] shadow-lg rounded-lg overflow-hidden hover:shadow-xl bg-white cursor-pointer text-main hover:text-secondary'
            )}
        >
            <img loading="lazy" className="w-full h-[110px] object-cover" alt="" src={image} />
            <span className="flex justify-center w-full p-[8px] font-semibold text-[14px]">{title}</span>
        </div>
    );
};

export default memo(SelectProvinceItem);
