import React, { useEffect, useState } from 'react';
import { apiDestroyPost, apiGetPostsManage } from '../../apis';
import icons from '../../ultils/icons';
import NewPost from './NewPost';
import Button from '../../components/common/Button';
import withBaseComp from '../../hocs/withBaseComp';
import { showModal } from '../../store/app/appSlice';
import { Loading } from '../../components/modal';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManagePost = ({ dispatch }) => {
    const { GrFormEdit } = icons;
    const [managePosts, setManagePosts] = useState([]);
    const [valueEditPost, setValueEditPost] = useState();
    const [selectedPost, setSelectedPost] = useState([]);
    const [updated, setUpdated] = useState(false);

    const handleChange = (e, data) => {
        const { name, checked } = e.target;
        if (checked) {
            if (name === 'allSelect') {
                setSelectedPost(managePosts);
            } else {
                setSelectedPost([...selectedPost, data]);
            }
        } else {
            if (name === 'allSelect') {
                setSelectedPost([]);
            } else {
                let temppost = selectedPost.filter(item => item.id !== data.id);
                setSelectedPost(temppost);
            }
        }
    };

    const handleDestroyPost = async () => {
        const id = selectedPost.map(item => item.id);
        Swal.fire({
            title: 'Bạn chắc chứ ?',
            text: 'Bài đăng đã xoá sẽ không khôi phục được đâu nha !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xoá !',
        }).then(async result => {
            if (result.isConfirmed) {
                dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
                const response = await apiDestroyPost({ id });
                dispatch(showModal({ isShowModal: false, childrenModal: null }));
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 500,
                    });
                    setUpdated(prev => !prev);
                    setSelectedPost([]);
                }
            }
        });
    };

    useEffect(() => {
        const fetchApiGetPosts = async () => {
            const response = await apiGetPostsManage();
            if (response.success) setManagePosts(response.result.rows);
        };

        fetchApiGetPosts();
    }, [updated]);

    return (
        <>
            {!valueEditPost && (
                <div className="w-full p-[10px] lg:p-[40px] pt-[50px] lg:pt-0">
                    <p className="py-[10px] border-b text-[22px] font-semibold lg:text-[30px]">Quản lý tin đăng</p>
                    <div className="relative pt-[20px] overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between p-4 bg-white gap-8">
                            {selectedPost.length > 0 && (
                                <Button onClick={handleDestroyPost} deleted>
                                    Xoá
                                </Button>
                            )}

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
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search-users"
                                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg min-w-[80px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 -500-500"
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
                                                name="allSelect"
                                                checked={selectedPost?.length === managePosts?.length}
                                                onChange={e => handleChange(e, managePosts)}
                                                id="checkbox-all-search"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500-600-800-gray-800 focus:ring-2 "
                                            />
                                            <label htmlFor="checkbox-all-search" className="sr-only">
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
                                                        checked={selectedPost.some(item => item?.id === managePost.id)}
                                                        onChange={e => handleChange(e, managePost)}
                                                        id="checkbox-table-search-1"
                                                        type="checkbox"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                                                    />
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                                                        checkbox
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{managePost?.overviews?.code}</td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    to={`/${managePost?.title.replaceAll('/', '')}/${managePost?.id}`}
                                                >
                                                    <img
                                                        loading="lazy"
                                                        className="min-w-[100px] h-[100px] object-cover"
                                                        alt=""
                                                        src={imagePost[0]}
                                                    />
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 flex flex-col gap-3">
                                                <div className="flex flex-col">
                                                    <Link
                                                        to={`/${managePost?.title.replaceAll('/', '')}/${
                                                            managePost?.id
                                                        }`}
                                                        className="text-[#055699] font-semibold line-clamp-1"
                                                    >
                                                        {managePost?.title}
                                                    </Link>
                                                    <div className="flex items-center">
                                                        <span className="text-[13px] min-w-[50px] font-medium mr-[5px]">
                                                            Địa chỉ:
                                                        </span>
                                                        <span className="text-[13px] line-clamp-1">
                                                            {managePost?.address}
                                                        </span>
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
                                            <td className="px-6 py-4">
                                                <span className="text-price">{managePost?.attributes?.price}</span>
                                            </td>
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

export default withBaseComp(ManagePost);
