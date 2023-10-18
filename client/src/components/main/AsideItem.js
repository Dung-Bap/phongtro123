import React, { memo } from 'react';
import icons from '../../ultils/icons';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { convertPath } from '../../ultils/helpers';

const AsideItem = ({ title, contents, setUpdate, custom, type }) => {
    const { MdKeyboardArrowRight } = icons;
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();

    const handleOnClick = path => {
        navigate(`/${path}`);
        setUpdate(prev => !prev);
    };

    const handleChoose = code => {
        const queries = Object.fromEntries([...params]);
        queries.page = 1;
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ ...queries, [type]: code }).toString(),
        });
        setUpdate(prev => !prev);
    };

    return (
        <div className=" border rounded-lg overflow-hidden bg-white shadow-lg p-[20px] mb-[20px]">
            <h1 className="mb-[8px] text-[18px] font-semibold">{title}</h1>
            {!custom &&
                contents?.map(content => (
                    <div
                        onClick={() => handleOnClick(convertPath(content?.value))}
                        key={content.code}
                        className="flex items-center gap-2 py-2 border-gray-100 border-b"
                    >
                        <MdKeyboardArrowRight color="gray" />
                        <span className="cursor-pointer hover:text-secondary">{content.value}</span>
                    </div>
                ))}
            <div className="flex w-full flex-wrap">
                {custom &&
                    contents?.map(content => (
                        <div
                            onClick={() => handleChoose(content.code)}
                            className="flex items-center gap-2 py-2 border-gray-100 border-b w-[50%]"
                            key={content.code}
                        >
                            <span>
                                <MdKeyboardArrowRight color="gray" />
                            </span>
                            <span className="cursor-pointer hover:text-secondary">{content.value}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default memo(AsideItem);
