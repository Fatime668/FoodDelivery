import * as yup from 'yup';
export const signInSchema = yup.object({
  username: yup.string().required('username is required'),
  email: yup.string(),
  password: yup.string().required('Password is required'),
});

export const signUpSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  email: yup
    .string()
    .required('Email is required')

});

export const signInInitialValues = {
  username: '',
  password: '',
};

export const signUpInitialValues = {
  email: '',
  username: '',
  password: '',
};