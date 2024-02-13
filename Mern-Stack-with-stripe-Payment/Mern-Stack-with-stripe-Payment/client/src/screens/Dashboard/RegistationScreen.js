import React, { useEffect } from 'react';
import Layout from '../../layout/Layout';
import Input from '../../components/Input';
import { BiLoaderCircle, BiLogInCircle } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema, registerSchema } from '../../components/Validation';
import { loginAction, registerAction } from '../../Redux/Actions/UserAction';

function RegistationScreen() {
  const [login, setLogin] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const redirect = state?.from ? state?.from : '/dashboard';

  const {
    userRegister: { loading: regLoading, error: regError },
    userLogin: { loading, error, userInfo },
  } = useSelector((state) => state);

  // validate user
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(login ? LoginSchema : registerSchema),
  });

  const handlerSubmitLogin = (data) => {
    dispatch(loginAction(data));
    reset();
  };

  const handlerSubmitRegister = (data) => {
    dispatch(registerAction(data));
    reset();
  };

  useEffect(() => {
    if (error || regError) {
      toast.error(error || regError);
      dispatch({ type: error ? 'USER_LOGIN_RESET' : 'USER_REGISTER_RESET' });
    }
    // if user is logged in redirect to home
    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, userInfo, regError, redirect]);
  return (
    <Layout header={true}>
      <div className="bg-deepGray">
        <div className="min-h-screen container mx-auto xl:px-32 px-4 lg:py-0 py-12 flex-colo">
          <div className="sticky xl:w-4/5 flex-colo gap-4 rounded-md top-28 col-span-4 bg-white border  border-text">
            <div className="w-full grid lg:grid-cols-2 gap-4">
              {/* 1 */}
              <div className="col-span-1 row-start-2 lg:row-start-1 bg-white flex-colo sm:px-24 px-4 lg:py-0 py-24">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="sm:w-2/2 w-3/5 mx-auto"
                />
                <p className="text-sm my-3 leading-6 text-center">
                  {!login
                    ? 'Welcome back in Online Shop. We offer the best prices and we deliver to your doorstep. What are you waiting for? Start shopping now!'
                    : 'Online Shop is the best online shopping store. We have a wide range of products; from fashion items to electronic devices. start shopping now!'}
                </p>
                <button
                  onClick={() => {
                    setLogin(!login);
                    // reset form
                    reset();
                  }}
                  className="bg-main mt-2 text-white text-sm font-semibold py-3 w-3/4 sm:w-2/4 rounded-full"
                >
                  {login ? 'SIGN UP' : 'LOGIN'}
                </button>
              </div>
              {/* 2 */}
              <div className="col-span-1 bg-main flex-colo px-6 sm:px-12 py-8 sm:py-24">
                <h1 className="text-2xl text-white font-semibold text-center">
                  {login ? 'Welcome Back' : 'Create an Account'}
                </h1>
                <p className="text-sm my-4 text-gray-100 text-center font-light">
                  {login
                    ? 'Welcome back! Please login to your account'
                    : 'Please fill in the form below to create an account'}
                </p>

                <div className="flex flex-col  gap-5 w-full">
                  {!login && (
                    <>
                      <Input
                        name="fullName"
                        register={register('fullName')}
                        errors={errors.fullName}
                        type="text"
                        placeHolder="FullName"
                      />
                      <Input
                        name="phone"
                        register={register('phone')}
                        errors={errors.phone}
                        type="number"
                        placeHolder="Phone Number"
                      />
                    </>
                  )}
                  <Input
                    name="email"
                    register={register('email')}
                    errors={errors.email}
                    type="email"
                    placeHolder="Email"
                  />
                  <Input
                    name="password"
                    register={register('password')}
                    errors={errors.password}
                    type="password"
                    placeHolder="Password"
                  />
                  <button
                    disabled={loading | regLoading}
                    onClick={handleSubmit(
                      login ? handlerSubmitLogin : handlerSubmitRegister
                    )}
                    className="bg-black flex-rows gap-4 text-white text-sm font-semibold py-4 w-full rounded"
                  >
                    {loading | regLoading ? (
                      <BiLoaderCircle className="animate-spin text-white" />
                    ) : (
                      <>
                        {login ? 'LOGIN' : 'SIGN UP'}
                        <BiLogInCircle className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RegistationScreen;
