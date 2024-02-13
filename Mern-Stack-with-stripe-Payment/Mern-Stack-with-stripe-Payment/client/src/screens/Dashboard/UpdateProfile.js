import React, { useEffect } from 'react';
import Uploader from '../../components/Uploder';
import SideBar from './SideBar';
import Input from './../../components/Input';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileSchema } from '../../components/Validation';
import {
  deleteProfileAction,
  updateProfileAction,
} from '../../Redux/Actions/UserAction';

function UpdateProfile() {
  const dispatch = useDispatch();
  const [image, setImage] = React.useState(null);

  const {
    updateProfile: { loading, error, success },
    userLogin: { userInfo },
    deleteProfile: {
      loading: deleteLoading,
      error: deleteError,
      success: deleteSuccess,
    },
  } = useSelector((state) => state);

  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  // update user
  const handlerSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image }));
  };

  // delete user
  const handlerDelete = () => {
    window.confirm('All your data will be lost. Are you sure?') &&
      dispatch(deleteProfileAction());
  };

  // error and success
  useEffect(() => {
    if (error || deleteError) {
      toast.error(error || deleteError);
      dispatch({
        type: error ? 'PROFILE_UPDATE_RESET' : 'PROFILE_DELETE_RESET',
      });
    }
    // if success reset form
    if (success || deleteSuccess) {
      toast.success(success ? 'Profile updated!!' : 'Account deleted!!');
      dispatch({
        type: success ? 'PROFILE_UPDATE_RESET' : 'PROFILE_DELETE_RESET',
      });
    }
  }, [dispatch, error, success, deleteError, deleteSuccess]);

  // set user data
  useEffect(() => {
    if (userInfo) {
      setValue('fullName', userInfo.fullName);
      setValue('email', userInfo.email);
      setValue('phone', userInfo.phone);
      setImage(userInfo.image);
    }
  }, [userInfo, setValue]);

  return (
    <SideBar>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Profile</h2>
        <Uploader image={image} setImage={setImage} />
        <Input
          type="text"
          placeHolder="OnlineShop"
          label="Full Name"
          register={register('fullName')}
          errors={errors.fullName}
          name={'fullName'}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            type="email"
            placeHolder="user@gmail.com"
            label="Email"
            register={register('email')}
            errors={errors.email}
            name={'email'}
          />
          <Input
            type="number"
            placeHolder="0754661424"
            label="Phone Number"
            register={register('phone')}
            errors={errors.phone}
            name={'phone'}
          />
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            disabled={deleteLoading || loading}
            onClick={handlerDelete}
            className="bg-flash font-medium text-white py-3 px-6 rounded sm:w-auto w-full"
          >
            {deleteLoading ? 'Deleting...' : 'Delete Account'}
          </button>
          <button
            disabled={loading || deleteLoading}
            onClick={handleSubmit(handlerSubmit)}
            className="bg-main font-medium text-white py-3 px-6 rounded sm:w-auto w-full"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default UpdateProfile;
