import React from 'react';
import { InputFileds } from '../../components/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../components/common/Button';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { path } from '../../ultils/path';
import { apiLogin } from '../../apis';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/user/userSlice';
import { showModal } from '../../store/app/appSlice';
import { Loading } from '../../components/modal';

const Login = () => {
    const loginSchema = yup.object({
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async data => {
        dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
        const response = await apiLogin(data);
        dispatch(showModal({ isShowModal: false, childrenModal: null }));
        if (response?.success) {
            dispatch(registerUser({ isLoggedIn: true, token: response.token }));
            searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`${path.HOME}`);
        } else Swal.fire('Opps!', response.message, 'error');
    };
    return (
        <div className="w-full flex justify-center">
            <div className="w-main p-[20px] flex justify-center pt-[50px] lg:pt-0">
                <form
                    method="POST"
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-[600px] p-[30px] bg-white border rounded-lg shadow-xl"
                >
                    <h1 className="text-[28px] mb-[15px] font-medium">Đăng nhập</h1>
                    <InputFileds
                        label={'Số điện thoại'}
                        registername={register('phone')}
                        errorName={errors.phone?.message}
                        withFull
                    />
                    <InputFileds
                        label={'Mật khẩu'}
                        registername={register('password')}
                        errorName={errors.password?.message}
                        withFull
                    />
                    <Button primary full>
                        Đăng nhập
                    </Button>
                    <div className="flex justify-between items-center mt-[20px]">
                        <span className="text-main cursor-pointer text-sm hover:underline">Bạn quên mật khẩu</span>
                        <Link to={`/${path.REGISTER}`} className="text-main cursor-pointer text-sm hover:underline">
                            Tạo tài khoản mới
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
