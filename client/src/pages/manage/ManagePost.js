import React, { useEffect, useState } from 'react';
import { apiGetPostsManage } from '../../apis';
import icons from '../../ultils/icons';
import NewPost from './NewPost';

const ManagePost = () => {
    const { GrFormEdit } = icons;
    const [managePosts, setManagePosts] = useState([]);
    const [valueEditPost, setValueEditPost] = useState();

    useEffect(() => {
        const fetchApiGetPosts = async () => {
            const response = await apiGetPostsManage();
            if (response.success) setManagePosts(response.result.rows);
        };

        fetchApiGetPosts();
    }, []);

    return (
        <>
            {!valueEditPost && (
                <div className="w-full p-[40px]">
                    <p className="py-[10px] border-b text-[30px]">Quản lý tin đăng</p>
                    <div className="relative pt-[20px] overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between pb-4 bg-white">
                            <div>
                                <button
                                    id="dropdownActionButton"
                                    data-dropdown-toggle="dropdownAction"
                                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5-700-600-700"
                                    type="button"
                                >
                                    <span className="sr-only">Action button</span>
                                    Hành động
                                    <svg
                                        className="w-2.5 h-2.5 ml-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                {/* <!-- Dropdown menu --> */}
                                <div
                                    id="dropdownAction"
                                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                                >
                                    <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownActionButton">
                                        <li>ahihi</li>
                                    </ul>
                                    <div className="py-1">
                                        <span>ahuhu</span>
                                    </div>
                                </div>
                            </div>
                            <label for="table-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search-users"
                                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 -500-500"
                                    placeholder="Tìm kiếm..."
                                />
                            </div>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-all-search"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500-600-800-gray-800 focus:ring-2 "
                                            />
                                            <label for="checkbox-all-search" className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mã tin
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ảnh đại diện
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tiêu đề
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Giá
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ngày đăng
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {managePosts?.map(managePost => {
                                    let imagePost = JSON.parse(managePost?.images.image);
                                    return (
                                        <tr key={managePost.id} className="bg-white border-b hover:bg-gray-50 ">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="checkbox-table-search-1"
                                                        type="checkbox"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                                                    />
                                                    <label for="checkbox-table-search-1" className="sr-only">
                                                        checkbox
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{managePost?.overviews?.code}</td>
                                            <td className="px-6 py-4">
                                                <img
                                                    className="min-w-[100px] h-[100px] object-cover"
                                                    alt=""
                                                    src={imagePost[0]}
                                                />
                                            </td>
                                            <td className="px-6 py-4 flex flex-col gap-3">
                                                <div className="flex flex-col">
                                                    <span className="text-[#055699] font-semibold line-clamp-1">
                                                        {managePost?.title}
                                                    </span>
                                                    <div className="flex items-center line-clamp-1">
                                                        <span className="text-[13px] font-medium mr-[5px]">
                                                            Địa chỉ:{' '}
                                                        </span>
                                                        <span className="text-[13px]">{managePost?.address}</span>
                                                    </div>
                                                </div>
                                                <span
                                                    onClick={() => setValueEditPost(managePost)}
                                                    className="flex items-center p-1 bg-gray-200 w-[80px] rounded-md text-main cursor-pointer "
                                                >
                                                    <GrFormEdit size={20} />
                                                    Sửa tin
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-price">{managePost?.attributes?.price}</td>
                                            <td className="px-6 py-4">{managePost?.attributes?.published}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {valueEditPost && <NewPost valueEditPost={valueEditPost} />}
        </>
    );
};

export default ManagePost;
