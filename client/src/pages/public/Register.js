import React from 'react';
import { InputFileds } from '../../components/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../ultils/path';
import { apiRegister } from '../../apis/user';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/app/appSlice';
import { Loading } from '../../components/modal';

const Register = () => {
    const RegisterSchema = yup.object({
        name: yup.string().required('Please enter "Name"'),
        phone: yup
            .string()
            .required('Please enter "Phone Number"')
            .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Phone number does not exist !'),
        password: yup
            .string()
            .required('Please enter "Password"')
            .min(
                8,
                'Password must be at least 8 characters including uppercase letters, lowercase letters, numbers and special characters !!'
            )
            .test(
                'isValidPass',
                ' Password must be at least 8 characters including uppercase letters, lowercase letters, numbers and special characters !!',
                (value, context) => {
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasLowerCase = /[a-z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    const hasSymbole = /[!@#%&]/.test(value);
                    let validConditions = 0;
                    const numberOfMustBeValidConditions = 3;
                    const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
                    conditions.forEach(condition => (condition ? validConditions++ : null));
                    if (validConditions >= numberOfMustBeValidConditions) {
                        return true;
                    }
                    return false;
                }
            ),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterSchema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async data => {
        dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
        const response = await apiRegister(data);
        dispatch(showModal({ isShowModal: false, childrenModal: null }));
        if (response?.success) {
            Swal.fire('Congratulation', response?.message, 'success').then(() => {
                reset();
                navigate(`/${path.LOGIN}`);
            });
        } else Swal.fire('Opps!', response?.message, 'error').then(() => reset());
    };
    return (
        <div className="w-full flex justify-center">
            <div className="w-main p-[20px] flex justify-center">
                <form
                    method="POST"
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-[600px] p-[30px] bg-white border rounded-lg shadow-xl"
                >
                    <h1 className="text-[28px] mb-[15px] font-medium">Tạo tài khoản mới</h1>
                    <InputFileds
                        label={'Họ tên'}
                        placeholder={'Họ tên'}
                        registername={register('name')}
                        errorName={errors.name?.message}
                        withFull
                    />
                    <InputFileds
                        label={'Số điện thoại'}
                        placeholder={'Số điện thoại'}
                        registername={register('phone')}
                        errorName={errors.phone?.message}
                        withFull
                    />
                    <InputFileds
                        label={'Tạo mật khẩu'}
                        placeholder={'Tạo mật khẩu'}
                        registername={register('password')}
                        errorName={errors.password?.message}
                        withFull
                    />
                    <Button primary> Tạo tài khoản </Button>
                    <div className="mt-[20px]">
                        <span>
                            Bạn đã có tài khoản?
                            <Link to={`/${path.LOGIN}`} className="text-main cursor-pointer text-sm hover:underline">
                                Đăng nhập ngay
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
