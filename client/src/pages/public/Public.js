/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopHeader, Navigate } from './';
import { Support, Whyus } from '../../components/main';
import clsx from 'clsx';
import icons from '../../ultils/icons';

const Public = () => {
    const { AiOutlineArrowUp } = icons;
    const pageRef = useRef();
    const [fix, setFix] = useState(false);
    const [resize, setResize] = useState(false);
    const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
    const onScroll = event => {
        event.currentTarget.scrollTop >= 71 ? setFix(true) : setFix(false);
    };

    useEffect(() => {
        const resizeW = () => changeDeviceSize(window.innerWidth);
        window.addEventListener('resize', resizeW); // Update the width on resize
        return () => window.removeEventListener('resize', resizeW);
    });

    useEffect(() => {
        if (deviceSize <= 1023) setResize(true);
    }, [deviceSize]);

    return (
        <div onScroll={onScroll} className="max-h-screen relative overflow-y-auto w-full flex flex-col items-center">
            <div className="w-full" ref={pageRef}>
                <div className={clsx(resize && 'fixed top-0 left-0 right-0 z-40', 'w-full bg-[white]')}>
                    <TopHeader />
                </div>
                <div className={clsx(fix && 'fixed top-0 left-0 right-0 z-50', 'w-full bg-main flex justify-center')}>
                    <Navigate />
                </div>
                <Outlet />
                <Whyus />
                <Support />
                {fix && (
                    <div
                        onClick={() => pageRef.current.scrollIntoView({ behavior: 'smooth' })}
                        className="fixed flex justify-center items-center rounded-full bottom-[50px] right-[30px] bg-secondary w-[60px] h-[60px] cursor-pointer z-50"
                    >
                        <span>
                            <AiOutlineArrowUp size={30} color="white" />
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Public;
