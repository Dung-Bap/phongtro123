import React, { useEffect, useState } from 'react';
import { InputFileds } from '../../components/input';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import icons from '../../ultils/icons';
import { apiUpdateUser } from '../../apis';
import withBaseComp from '../../hocs/withBaseComp';
import { showModal } from '../../store/app/appSlice';
import { Loading } from '../../components/modal';
import Swal from 'sweetalert2';
import { getCurrent } from '../../store/user/asyncActions';
import { convertToBase64 } from '../../ultils/helpers';

const Personal = ({ dispatch }) => {
    const { dataUser } = useSelector(state => state.user);
    console.log(dataUser);
    // console.log(URL.createObjectURL(dataUser.avatar));
    const { BsFillCameraFill } = icons;
    const [updated, setUpdated] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState({
        avatar: null,
    });

    const userSchema = yup.object({
        phone: yup
            .string()
            .required('Vui lòng nhập trường này !')
            .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ !'),
        name: yup.string().required('Vui lòng nhập trường này !'),
    });

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(userSchema),
    });

    useEffect(() => {
        reset({
            phone: dataUser?.phone || '',
            name: dataUser?.name || '',
            zalo: dataUser?.zalo || '',
            fbUrl: dataUser?.fbUrl || '',
        });
    }, [dataUser, reset]);

    const handleReviewAvatar = async file => {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            Swal.fire('Something went wrong', 'Please choose image with type: jpg or png !', 'error');
        } else {
            const response = await convertToBase64(file);
            setPreviewAvatar(prev => ({ ...prev, avatar: response }));
        }
    };

    useEffect(() => {
        if (watch('avatar') instanceof FileList && watch('avatar').length > 0) {
            handleReviewAvatar(watch('avatar')[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('avatar')]);

    const onSubmit = async data => {
        const formdata = new FormData();
        if (data.avatar.length > 0) formdata.append('avatar', data.avatar[0]);
        delete data.avatar;
        for (let i of Object.entries(data)) formdata.append(i[0], i[1]);
        dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
        const response = await apiUpdateUser(formdata);
        dispatch(showModal({ isShowModal: false, childrenModal: null }));

        if (response.success) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1000,
            });
            setUpdated(!updated);
        } else Swal.fire('Opps!', response.message, 'error');
    };

    useEffect(() => {
        const dispatchUser = setTimeout(() => {
            dispatch(getCurrent());
        }, 1000);
        return () => {
            clearTimeout(dispatchUser);
        };
    }, [dispatch, updated]);
    return (
        <div className="w-full p-[40px]">
            <p className="py-[10px] border-b text-[30px]">Cập nhật thông tin cá nhân</p>
            <div className="w-full flex justify-center p-10">
                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="w-[730px] justify-center items-center">
                    <div className="w-full flex justify-center pb-10  ">
                        <div className="relative overflow-hidden">
                            <img
                                className="object-cover min-w-[100px] h-[100px] rounded-full "
                                alt=""
                                src={
                                    previewAvatar.avatar
                                        ? previewAvatar.avatar
                                        : dataUser?.avatar ||
                                          'https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2023/10/22/img-1641_1697968197.jpg'
                                }
                            />
                            <label
                                htmlFor="image"
                                className="absolute bottom-0 right-[38px] p-1 rounded-full bg-gray-200 cursor-pointer"
                            >
                                <BsFillCameraFill size={18} />
                            </label>
                        </div>
                        <input {...register('avatar')} type="file" id="image" hidden />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Số điện thoại</span>
                        <div>
                            <InputFileds withFull registername={register('phone')} errorName={errors.phone?.message} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Tên hiển thị</span>
                        <div>
                            <InputFileds withFull registername={register('name')} errorName={errors.name?.message} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Số Zalo</span>
                        <div>
                            <InputFileds withFull registername={register('zalo')} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-10">
                        <span>Facebook</span>
                        <div>
                            <InputFileds withFull registername={register('fbUrl')} />
                        </div>
                    </div>
                    <Button primary>Lưu & Cập nhật</Button>
                </form>
            </div>
        </div>
    );
};

export default withBaseComp(Personal);
