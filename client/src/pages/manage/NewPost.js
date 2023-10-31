import Swal from 'sweetalert2';
import React, { memo, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

import { InputFileds, SelectFileds, TextareaFields } from '../../components/input';
import Button from '../../components/common/Button';
import { apiCreatePost, apiUpdatePost, getDistricts, getProvinces } from '../../apis';
import withBaseComp from '../../hocs/withBaseComp';
import { getCategories } from '../../store/app/asyncActions';
import { gender } from '../../ultils/contants';
import { convertStringToNumberAcreage, convertStringToNumberPrice, convertToBase64 } from '../../ultils/helpers';
import { showModal } from '../../store/app/appSlice';
import { Loading } from '../../components/modal';
import { path } from '../../ultils/path';

const NewPost = ({ dispatch, navigate, valueEditPost }) => {
    const { categories } = useSelector(state => state.app);
    const { dataUser } = useSelector(state => state.user);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [address, setAddress] = useState('');
    const [previewImage, setPreviewImage] = useState({
        images: [],
    });

    const newPostSchema = yup.object({
        province: yup.string().required('Chưa chọn Tỉnh/Thành Phố'),
        district: yup.string().required('Chưa chọn Quận/Huyện'),
        categoryCode: yup.string().required('Chưa chọn loại chuyên mục'),
        title: yup.string().required('Tiêu đề không được để trống'),
        description: yup.string().required('Bạn chưa nhập nội dung'),
        price: yup.number().typeError('Bạn chưa nhập giá phòng, hãy nhập số !').min(100000, 'Tối thiểu là 100.000đ'),
        acreage: yup.number().typeError('Bạn chưa nhập diện tích, hãy nhập số !').min(10, 'Tối thiểu là 10 m2'),
        housenumber: yup.string().required('Bạn chưa nhập số nhà !'),
        gender: yup.string(),
    });

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(newPostSchema),
    });

    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fechApiProvince = async () => {
            const response = await getProvinces();
            if (response) setProvinces(response);
        };
        fechApiProvince();
    }, []);

    useEffect(() => {
        const fechApiDistrict = async () => {
            if (valueEditPost) {
                const addressEdit = valueEditPost?.address?.split(',');
                const provinceEdit = addressEdit[addressEdit?.length - 1].trim();
                const response = await getDistricts(
                    provinces?.find(item => item.province_name === provinceEdit)?.province_id
                );
                if (response) setDistricts(response);
            }
        };
        fechApiDistrict();
    }, [valueEditPost, provinces]);

    useEffect(() => {
        const fechApiDistrict = async () => {
            const response = await getDistricts(province);
            if (response) setDistricts(response);
        };
        fechApiDistrict();
        setDistrict(null);
    }, [province]);

    useEffect(() => {
        if (valueEditPost) {
            const addressEdit = valueEditPost?.address?.split(',');
            const provinceEdit = addressEdit[addressEdit?.length - 1].trim();
            reset({
                province: provinces?.find(item => item.province_name === provinceEdit)?.province_id,
            });
        }
    }, [valueEditPost, provinces, reset]);

    useEffect(() => {
        if (valueEditPost) {
            const addressEdit = valueEditPost?.address?.split(',');
            const districtEdit = addressEdit[addressEdit?.length - 2].trim();
            reset({
                district: districts?.find(item => item.district_name === districtEdit)?.district_id,
            });
        }
    }, [valueEditPost, districts, reset]);

    useEffect(() => {
        if (valueEditPost) {
            const imageEdit = JSON.parse(valueEditPost?.images?.image);
            setPreviewImage({
                images: imageEdit,
            });
            reset({
                categoryCode: valueEditPost?.categoryCode,
                title: valueEditPost?.title,
                description: JSON.parse(valueEditPost?.description),
                price: convertStringToNumberPrice(valueEditPost?.attributes?.price),
                acreage: convertStringToNumberAcreage(valueEditPost?.attributes?.acreage),
                gender: valueEditPost?.overviews?.target,
            });
        }
    }, [reset, valueEditPost]);

    const handleReviewImages = async files => {
        const reviewImages = [];
        for (let file of files) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return;
            } else {
                const response = await convertToBase64(file);
                reviewImages.push(response);
            }
        }
        setPreviewImage(prev => ({ ...prev, images: reviewImages }));
    };

    useEffect(() => {
        if (watch('images')?.length > 0) handleReviewImages(watch('images'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('images')]);

    const onSubmit = async data => {
        data.address = `${address || valueEditPost?.address?.split(',')[0].trim()}, ${
            districts?.find(item => item.district_id === district)?.district_name ||
            valueEditPost?.address?.split(',')[valueEditPost?.address?.split(',').length - 2].trim()
        }, ${
            provinces?.find(item => item.province_id === province)?.province_name ||
            valueEditPost?.address?.split(',')[valueEditPost?.address?.split(',').length - 1].trim()
        }`;

        data.labelBody = `${categories.find(item => item.code === data.categoryCode).value} ${
            districts.find(item => item.district_id === data.district).district_name
        }`;
        data.area = `${categories.find(item => item.code === data.categoryCode).value} ${
            provinces.find(item => item.province_id === data.province).province_name
        }`;
        data.category = `${categories.find(item => item.code === data.categoryCode).value}`;
        data.userId = dataUser.id;

        data.postId = valueEditPost?.id;
        data.attributeId = valueEditPost?.attributes?.id;
        data.imagesId = valueEditPost?.images?.id;
        data.overviewId = valueEditPost?.overviews?.id;

        const formData = new FormData();
        data.images = data.images.length === 0 ? previewImage.images : data.images;
        for (let image of data.images) if (data.images.length > 0) formData.append('images', image);

        // delete data.images;
        for (let i of Object.entries(data)) formData.append(i[0], i[1]);
        dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
        const response = valueEditPost ? await apiUpdatePost(formData) : await apiCreatePost(formData);
        dispatch(showModal({ isShowModal: false, childrenModal: null }));
        if (response.success) {
            Swal.fire({
                title: 'Thành công !',
                text: response.message,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Về trang chủ',
            }).then(result => {
                if (result.isConfirmed) {
                    navigate(`${path.HOME}`);
                }
            });
        } else Swal.fire('Opps!', response.message, 'error');
        reset();
    };

    return (
        <div className="w-full p-[40px]">
            <p className="py-[10px] border-b text-[30px]">
                {valueEditPost ? `Sửa tin đăng (Mã tin: ${valueEditPost.overviews.code})` : 'Đăng tin mới'}
            </p>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="w-full flex">
                <div className="w-[69%] mr-[30px]">
                    <p className="text-[20px] my-[30px] font-semibold">Địa chỉ cho thuê</p>
                    <div className="w-full flex items-center gap-8 mb-[20px]">
                        <div className="w-[50%]">
                            <SelectFileds
                                registername={register('province')}
                                errorName={errors.province?.message}
                                onChange={e => setProvince(e.target.value)}
                                withFull
                                defaultOption={'-- Chọn Tỉnh/TP --'}
                                label={'Tỉnh/Thành Phố'}
                                options={provinces}
                                type={'province'}
                            />
                        </div>
                        <div className="w-[50%]">
                            <SelectFileds
                                registername={register('district')}
                                errorName={errors.district?.message}
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
                            registername={register('housenumber')}
                            errorName={errors.housenumber?.message}
                            label={'Số nhà'}
                            withFull
                            defaultValue={valueEditPost ? valueEditPost?.address?.split(',')[0].trim() : ''}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputFileds
                            label={'Địa chỉ chính xác'}
                            withFull
                            readOnly
                            hidden
                            value={
                                valueEditPost
                                    ? `${address ? `${address}` : `${valueEditPost?.address?.split(',')[0].trim()},`} ${
                                          district
                                              ? `${
                                                    districts?.find(item => item.district_id === district)
                                                        ?.district_name
                                                },`
                                              : `${valueEditPost?.address
                                                    ?.split(',')
                                                    [valueEditPost?.address?.split(',').length - 2].trim()},`
                                      } ${
                                          province
                                              ? `${
                                                    provinces?.find(item => item.province_id === province)
                                                        ?.province_name
                                                }`
                                              : `${valueEditPost?.address
                                                    ?.split(',')
                                                    [valueEditPost?.address?.split(',').length - 1].trim()}`
                                      }`
                                    : `${address ? `${address},` : ''} ${
                                          district
                                              ? `${
                                                    districts?.find(item => item.district_id === district)
                                                        ?.district_name
                                                },`
                                              : ''
                                      } ${
                                          province
                                              ? `${
                                                    provinces?.find(item => item.province_id === province)
                                                        ?.province_name
                                                }`
                                              : ''
                                      }`
                            }
                        />
                    </div>
                    <p className="text-[20px] my-[30px] font-semibold">Thông tin mô tả</p>
                    <div className="w-[50%] mb-[20px]">
                        <SelectFileds
                            registername={register('categoryCode')}
                            errorName={errors.categoryCode?.message}
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
                            registername={register('title')}
                            errorName={errors.title?.message}
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
                    <div className="w-[50%]">
                        <InputFileds
                            label={'Giá cho thuê'}
                            withFull
                            registername={register('price')}
                            errorName={errors.price?.message}
                            des={'Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'}
                            note={'đồng/tháng'}
                        />
                    </div>
                    <div className="w-[50%]">
                        <InputFileds
                            label={'Diện tích'}
                            withFull
                            registername={register('acreage')}
                            errorName={errors.acreage?.message}
                            des={'Nhập diện tích, ví dụ 50'}
                            note={'m2'}
                        />
                    </div>
                    <div className="w-[50%]">
                        <SelectFileds
                            registername={register('gender')}
                            withFull
                            defaultOption={'-- Tất cả --'}
                            label={'Đối tượng cho thuê'}
                            options={gender}
                        />
                    </div>
                    <p className="text-[20px] my-[30px] font-semibold">Hình ảnh</p>
                    <div className="w-full flex flex-col mb-[20px]">
                        <p>{'Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn'}</p>
                        <label
                            htmlFor="images"
                            className="w-full flex items-center justify-center border-dashed border-2 min-h-[200px] border-gray-300"
                        >
                            <div className="flex flex-col justify-center items-center cursor-pointer">
                                <img
                                    className="w-[90px] mb-[10px]"
                                    alt=""
                                    src="https://phongtro123.com/dashboard_resource/images/upload-image.png"
                                />
                                <p>Thêm ảnh</p>
                            </div>
                        </label>
                        <input multiple {...register('images')} type="file" id="images" hidden />

                        <div className="flex gap-3 flex-wrap mt-[10px]">
                            {previewImage?.images?.map((image, index) => (
                                <img key={index} src={image} alt="" className="h-[200px] object-contain"></img>
                            ))}
                        </div>
                    </div>

                    <Button primary>{valueEditPost ? 'Cập nhật' : 'Tiếp tục'}</Button>
                </div>
                <div className="w-[31%]">Map</div>
            </form>
        </div>
    );
};

export default withBaseComp(memo(NewPost));
