import * as Yup from 'yup';

const phoneRegExp = /^\+?\d{8,15}$/;


export const Registervalidateform=Yup.object().shape({
    username:Yup.string().min(2).required('User name is required'),

    password:Yup.string().min(4,"Password must be at least 4 characters").max(12,"Password must be atmost 12 characters").required("Password is required"),

    Cpassword:Yup.string().oneOf([Yup.ref('password'),null],'Passwords must mach').required('Confirm Password is required'),

    role: Yup.string().required('Role is required').notOneOf(['Select_user'],"Select Valid Option"),

    age: Yup.string().matches(/^[0-9]+$/, 'Age must contain only numbers').required('Age is required'),

    email:Yup.string().email('Invalid email').required('Email is required'),

    phonenumber:Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),

    dataofjoin:Yup.date().required('Date is required').max(new Date(), 'Date cannot be in the future'),

    address:Yup.string().min(5, 'Address must be at least 5 characters').max(100, 'Textarea must be at most 100 characters').required('Address is required'),

    city:Yup.string().min(3,'City must be at least 3 character').max(20,'City must be atmost 20 character').required("city is Required"),

    zipCode:Yup.string().required().matches(/^[0-9]+$/, 'Zip Code must contain only numbers'),

})

export const Loginvalidateform=Yup.object().shape({
    username:Yup.string().min(2).required('User name is required'),

    password:Yup.string().min(4,"Password must be at least 1 characters").max(12,"Password must be atmost 12 characters").required("Password is required"),

    role: Yup.string().required('Role is required').notOneOf(['NotValue'],"Select Valid Option"),

})

export const CreateTaskValidation=Yup.object().shape({
    Task_Name:Yup.string().required(),

    description:Yup.string().required(),

    TaskDeadLineDate:Yup.date().required('Date is required').min(new Date(), 'Date cannot be in the past'),

    priority: Yup.string().required('Priority status is required').notOneOf(['Select_Priority'],"Select Valid Option")



})