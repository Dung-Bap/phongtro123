import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import { News } from '../main';
import { ProfileBox } from '../../pages/public';

const LoadingDetailPost = ({ currentPageRef }) => {
    return (
        <div ref={currentPageRef} className="w-full flex justify-center pt-[50px] pb-[16px] lg:py-4">
            <main className="w-full lg:w-main lg:flex gap-4 scroll-m-[16px]">
                <section className="w-full lg:w-[68%]">
                    <div className="border lg:p-4 lg:rounded-lg bg-white shadow-lg">
                        <div className="w-full relative lg:rounded-t-lg mb-[20px]">
                            <LoadingSkeleton className={'h-[350px] w-full'} />
                        </div>
                        <div className="px-4 lg:px-0">
                            <div className="uppercase text-[24px] text-secondary font-semibold line-clamp-3 mb-[10px]">
                                <LoadingSkeleton className={'w-full h-[83px]'} />
                            </div>
                            <div className="flex items-center mb-[6px]">
                                <LoadingSkeleton className={'w-full h-[20px]'} />
                            </div>
                            <div className="flex items-center mb-[6px]">
                                <LoadingSkeleton className={'w-full h-[20px]'} />
                            </div>
                            <div className="flex items-center gap-8">
                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                <LoadingSkeleton className={'w-full h-[20px]'} />
                            </div>
                            <h1 className="text-[18px] font-semibold py-3">
                                <LoadingSkeleton className={'w-[150px] h-[20px]'} />
                            </h1>
                            <div className="flex flex-col">
                                <LoadingSkeleton className={'w-full h-[300px]'} />
                            </div>
                            <h1 className="text-[18px] font-semibold py-3">
                                <LoadingSkeleton className={'w-[150px] h-[20px]'} />
                            </h1>
                            <div>
                                <table className="table-auto w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h1 className="text-[18px] font-semibold py-3">
                                <LoadingSkeleton className={'w-[150px] h-[20px]'} />
                            </h1>
                            <div>
                                <table className="table-auto w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                            <td>
                                                <LoadingSkeleton className={'w-full h-[20px]'} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <LoadingSkeleton className={'w-full h-[300px]'} />
                        </div>
                    </div>
                </section>
                <div className="lg:hidden">
                    <News />
                </div>
                <section className="w-[32%] hidden lg:block">
                    <ProfileBox />
                    <News />
                </section>
            </main>
        </div>
    );
};

export default LoadingDetailPost;
