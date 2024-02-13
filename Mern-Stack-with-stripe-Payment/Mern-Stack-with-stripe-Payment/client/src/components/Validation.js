import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .trim(),
  password: Yup.string()
    .min(6, 'Password is too short - should be 8 chars minimum.')
    .required('Required')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .matches(/^\S*$/, 'Whitespace is not allowed'),
});

export const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Name is too short - should be 3 chars minimum.')
    .required('Required')
    .max(20, 'Name is too long - should be 20 chars maximum.'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .trim(),
  password: Yup.string()
    .min(6, 'Password is too short - should be 8 chars minimum.')
    .required('Required')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .matches(/^\S*$/, 'Whitespace is not allowed'),
  phone: Yup.string().min(10, 'Invalid phone number').required('Required'),
});

export const updateProfileSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Name is too short - should be 3 chars minimum.')
    .required('Required')
    .max(20, 'Name is too long - should be 20 chars maximum.'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .trim(),
  phone: Yup.string().min(10, 'Invalid phone number').required('Required'),
});

// change password
export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Password is too short - should be 8 chars minimum.')
    .required('Required')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .trim('Password must not contain spaces'),
  newPassword: Yup.string()
    .min(6, 'Password is too short - should be 8 chars minimum.')
    .required('Required')
    .max(20, 'Password is too long - should be 20 chars maximum.')
    .trim('Password must not contain spaces'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});

// card info validation
export const cardInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'FirstName is too short - should be 3 chars minimum.')
    .required('Required')
    .max(20, 'FirstName is too long - should be 20 chars maximum.')
    .matches(/^\S*$/, 'Whitespace is not allowed'),
  lastName: Yup.string()
    .min(3, 'LastName is too short - should be 3 chars minimum.')
    .required('Required')
    .max(20, 'LastName is too long - should be 20 chars maximum.')
    .matches(/^\S*$/, 'Whitespace is not allowed'),
  phone: Yup.string()
    .min(10, 'Invalid phone number')
    .required('Required')
    .matches(/^\S*$/, 'Whitespace is not allowed'),
  jobTitle: Yup.string()
    .min(2, 'Job title is too short - should be 3 chars minimum.')
    .required('Required')
    .max(50, 'Job title is too long - should be 50 chars maximum.'),
  companyName: Yup.string()
    .required('Required')
    .max(20, 'Company name is too long - should be 20 chars maximum.'),
  tagLine: Yup.string()
    .required('Required')
    .max(20, 'Tagline is too long - should be 20 chars maximum.'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .trim(),
  website: Yup.string().url('Invalid url').required('Required'),
  address: Yup.string()
    .required('Required')
    .max(200, 'Address is too long - should be 200 chars maximum.'),
  postalCode: Yup.string().required('Required').max(20, 'Invalid code'),
});
