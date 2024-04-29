import * as Yup from 'yup';

export const Registervalidateform=Yup.object().shape({
    username:Yup.string().min(2).required('User name is required'),

    password:Yup.string().min(4,"Password must be at least 4 characters").required("Password is required"),

    Cpassword:Yup.string().oneOf([Yup.ref('password'),null],'Passwords must mach').required('Confirm Password is required'),

    role: Yup.string().required('Role is required'),

    age: Yup.number().positive('Age must be a positive number').integer('Age must be an integer').required('Age is required'),

    email:Yup.string().email('Invalid email').required('Email is required')
})

export const Loginvalidateform=Yup.object().shape({
    username:Yup.string().min(2).required('User name is required'),

    password:Yup.string().min(4,"Password must be at least 4 characters").required("Password is required"),

    role: Yup.string().required('Role is required'),

})