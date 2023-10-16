import React from 'react';
import icons from '../../ultils/icons';
import { Link } from 'react-router-dom';
import { convertPath } from '../../ultils/helpers';

const AsideItem = ({ title, contents }) => {
    const { MdKeyboardArrowRight } = icons;
    return (
        <div className="border rounded-lg overflow-hidden bg-white shadow-lg p-[20px] mb-[20px]">
            <h1 className="mb-[8px] text-[18px] font-semibold">{title}</h1>
            {contents?.map(content => (
                <Link
                    to={`/${convertPath(content?.value)}`}
                    key={content.code}
                    className="flex items-center gap-2 py-2 border-gray-100 border-b"
                >
                    <MdKeyboardArrowRight color="gray" />
                    <span className="cursor-pointer hover:text-secondary">{content.value}</span>
                </Link>
            ))}
        </div>
    );
};

export default AsideItem;
