import { FormikErrors } from "formik";

interface SignInFormValues {
    email: string;
    password: string;
}


interface SignUpFormValues {
    firstName: string;
    lastName: string;
    organizationName: string;
    deptName: string;
    email: string;
    password: string;
    city: string;
    country: string;

}

export const SignInValidate = (values: SignInFormValues) => {
    let errors: FormikErrors<SignInFormValues> = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }


    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be greater than 8 & less than 20 Characters';
    }

    else if (values.password.includes(" ")) {
        errors.password = "Invalid Password: Spaces are not permitted in passwords."
    }

    return errors
}


export function Signup_validation(values: SignUpFormValues) {

    let errors: FormikErrors<SignUpFormValues> = {};


    if (!values.firstName) {
        errors.firstName = "Required"
    }

    else if (values.firstName.includes(" ")) {
        errors.firstName = "Invalid firstName"
    }


    if (!values.lastName) {
        errors.lastName = "Required"
    }
    else if (values.lastName.includes(" ")) {
        errors.lastName = "Invalid lastName"
    }

    if (!values.organizationName) {
        errors.organizationName = "Required"
    }

    if (!values.deptName) {
        errors.deptName = "Required"
    }

    if(!values.city){
        errors.city = "Required"
    }

    if(!values.country){
        errors.country="Required"
    }


    if (!values.email) {
        errors.email = 'Required';
    }

    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }


    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be greater than 8 & less than 20 Characters';
    }

    else if (values.password.includes(" ")) {
        errors.password = "Invalid Password"
    }

    return errors
}