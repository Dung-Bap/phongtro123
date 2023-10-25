import { InputFileds, SelectFileds, TextareaFields } from '../../components/input';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import { getDistricts, getProvinces } from '../../apis';
import { useSelector } from 'react-redux';

const NewPost = () => {
    const { categories } = useSelector(state => state.app);
    console.log(categories);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fechApiProvince = async () => {
            const response = await getProvinces();
            if (response) setProvinces(response);
        };

        fechApiProvince();
    }, []);

    useEffect(() => {
        const fechApiDistrict = async () => {
            const response = await getDistricts(province);
            if (response) setDistricts(response);
        };
        fechApiDistrict();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [province]);

    const newPostSchema = yup.object({
        province: yup.string().required('Chưa chọn Tỉnh/Thành Phố'),
        district: yup.string().required('Chưa chọn Quận/Huyện'),
        adress: yup.string().required('Chưa chọn khu vực đăng tin'),
        category: yup.string().required('Chưa chọn loại chuyên mục'),
        header: yup.string().required('Tiêu đề không được để trống'),
        description: yup.string().required('Bạn chưa nhập nội dung'),
        price: yup.string().required('Bạn chưa nhập giá phòng'),
        acreage: yup.string().required('Bạn chưa nhập diện tích'),
        image: yup.string().required('Bạn chưa nhập diện tích'),
    });

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(newPostSchema),
    });

    const onSubmit = data => {
        console.log(data);
    };
    return (
        <div className="w-full p-[40px]">
            <p className="py-[10px] border-b text-[30px]">Đăng tin mới</p>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="w-full flex">
                <div className="w-[69%] mr-[30px]">
                    <p className="text-[20px] my-[30px] font-semibold">Địa chỉ cho thuê</p>
                    <div className="w-full flex items-center gap-8 mb-[20px]">
                        <div className="w-[50%]">
                            <SelectFileds
                                registername={register('province')}
                                errorName={errors.select?.message}
                                onChange={e => setProvince(e.target.value)}
                                withFull
                                defaultOption={'-- Chọn Tỉnh/TP --'}
                                label={'Tỉnh/Thành Phố'}
                                options={provinces}
                                type={'provine'}
                            />
                        </div>
                        <div className="w-[50%]">
                            <SelectFileds
                                registername={register('district')}
                                errorName={errors.select?.message}
                                onChange={e => setDistrict(e.target.value)}
                                withFull
                                defaultOption={'-- Quận/huyện --'}
                                label={'Quận/Huyện'}
                                options={districts}
                                type={'district'}
                            />
                        </div>
                    </div>
                    <div className="w-[25%]">
                        <InputFileds
                            label={'Số nhà'}
                            withFull
                            // defaultValue={editUser.lastname}
                            registername={register('adress')}
                            errorName={errors.adress?.message}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputFileds
                            label={'Địa chỉ chính xác'}
                            withFull
                            readOnly
                            defaultValue={
                                province &&
                                district &&
                                `${address} ${districts?.find(item => item.district_id === district)?.district_name}, ${
                                    provinces?.find(item => item.province_id === province)?.province_name
                                }`
                            }
                        />
                    </div>
                    <p className="text-[20px] my-[30px] font-semibold">Thông tin mô tả</p>
                    <div className="w-[50%] mb-[20px]">
                        <SelectFileds
                            registername={register('category')}
                            errorName={errors.select?.message}
                            onChange={e => setValue('category', e.target.value, { shouldValidate: true })}
                            withFull
                            defaultOption={'-- Chọn loại chuyên mục --'}
                            label={'Loại chuyên mục'}
                            options={categories}
                        />
                    </div>
                    <div className="w-full">
                        <InputFileds
                            label={'Tiêu đề'}
                            withFull
                            // defaultValue={editUser.lastname}
                            registername={register('header')}
                            errorName={errors.header?.message}
                        />
                    </div>
                    <div className="w-full mb-[20px]">
                        <TextareaFields
                            label={'Nội dung mô tả'}
                            registername={register('description')}
                            errorName={errors.description?.message}
                            withFull
                        />
                    </div>
                    <div className="w-full">
                        <InputFileds
                            label={'Giá cho thuê'}
                            withFull
                            // defaultValue={editUser.lastname}
                            registername={register('price')}
                            errorName={errors.price?.message}
                        />
                    </div>
                    <div className="w-full">
                        <InputFileds
                            label={'Diện tích'}
                            withFull
                            // defaultValue={editUser.lastname}
                            registername={register('acreage')}
                            errorName={errors.acreage?.message}
                        />
                    </div>
                    <div className="w-[50%]">
                        <SelectFileds
                            errorName={errors.select?.message}
                            onChange={e => setValue('sex', e.target.value, { shouldValidate: true })}
                            withFull
                            defaultOption={'-- Tất cả --'}
                            label={'Đối tượng cho thuê'}
                        />
                    </div>
                    <p className="text-[20px] my-[30px] font-semibold">Hình ảnh</p>
                    <div className="w-full flex flex-col mb-[20px]">
                        <p>{'Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn'}</p>
                        <div className="w-full flex items-center justify-center border-dashed border-2 min-h-[200px] border-gray-300">
                            <label htmlFor="image" className="flex flex-col justify-center items-center cursor-pointer">
                                <img
                                    className="w-[90px] mb-[10px]"
                                    alt=""
                                    src="https://phongtro123.com/dashboard_resource/images/upload-image.png"
                                />
                                <p htmlFor="image">Thêm ảnh</p>
                            </label>
                        </div>
                        <input {...register('image')} type="file" id="image" hidden />
                    </div>

                    <Button primary>Tiếp tục</Button>
                </div>
                <div className="w-[31%] border">Map</div>
            </form>
        </div>
    );
};

export default NewPost;
