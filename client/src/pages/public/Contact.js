import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { InputFileds } from '../../components/input';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../components/common/Button';

const Contact = () => {
    const RegisterSchema = yup.object({
        name: yup.string().required('Please enter "Full Name"'),
        content: yup.string().required('Please enter "Content"'),
        phone: yup
            .string()
            .required('Please enter "Phone Number"')
            .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Phone number does not exist !'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterSchema),
    });

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="pt-[50px] lg:pt-[20px] flex justify-center">
            <div className="w-full lg:w-main">
                <div className="hidden lg:block text-[26px] font-semibold my-[20px]">Liên hệ với chúng tôi</div>
                <div className="lg:flex w-full lg:gap-8 pb-[30px]">
                    <div className="w-full lg:w-[50%]">
                        <div className="flex flex-col lg:bg-gradient-to-r lg:from-blue-500 lg:to-cyan-500 p-[20px] lg:rounded-3xl lg:text-white">
                            <h2 className="font-semibold text-[16px] mb-[12px]">Thông tin liên hệ</h2>
                            <span className="mb-[12px]">
                                Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com
                            </span>
                            <span className="font-semibold mb-[12px]">
                                Điện thoại: <span className="font-normal">0917 686 101</span>
                            </span>
                            <span className="font-semibold mb-[12px]">
                                Email: <span className="font-normal">cskh.phongtro123@gmail.com</span>
                            </span>
                            <span className="font-semibold mb-[12px]">
                                Zalo: <span className="font-normal">0917 686 101</span>
                            </span>
                            <span className="font-semibold mb-[12px]">
                                Viber: <span className="font-normal">0917 686 101</span>
                            </span>
                            <span className="font-semibold mb-[12px]">
                                Địa chỉ:
                                <span className="font-normal">
                                    LD - 02.06, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2,
                                    Tp. Hồ Chí Minh.
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="w-full lg:w-[50%]">
                        <div className="w-full flex justify-center">
                            <div className="w-main flex justify-center lg:pt-0">
                                <form
                                    method="POST"
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="w-full p-[20px] bg-white border lg:rounded-lg shadow-xl"
                                >
                                    <h1 className="text-[20px] mb-[15px] font-semibold">Liên hệ trực tuyến</h1>
                                    <InputFileds
                                        label={'HỌ TÊN CỦA BẠN'}
                                        registername={register('name')}
                                        errorName={errors.name?.message}
                                        withFull
                                    />
                                    <InputFileds
                                        label={'SỐ ĐIỆN THOẠI'}
                                        registername={register('phone')}
                                        errorName={errors.phone?.message}
                                        withFull
                                    />
                                    <div className="flex flex-col mb-[20px]">
                                        <label className="font-semibold">NỘI DUNG</label>
                                        <textarea
                                            {...register('content')}
                                            className="form-textarea rounded-md min-h-[90px]"
                                        ></textarea>
                                        <span className="w-full text-[12px] font-light text-secondary">
                                            {errors.content?.message}
                                        </span>
                                    </div>

                                    <Button primary full>
                                        Gửi liên hệ
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
