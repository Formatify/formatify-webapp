import { FormikErrors } from "formik";
import { ProjectDetails, SignInFormValues, NewPasswordFormValues, ForgetFormValues, SignUpFormValues } from "@/types/interfaces";


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
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*/.test(values.password)) {
        errors.password = "Password must include uppercase, lowercase, number, and special character";
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

    if (!values.city) {
        errors.city = "Required"
    }

    if (!values.country) {
        errors.country = "Required"
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

    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*/.test(values.password)) {
        errors.password = "Password must include uppercase, lowercase, number, and special character";
    }


    return errors
}

export function Forget_Validation(values: ForgetFormValues) {
    let errors: FormikErrors<ForgetFormValues> = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors
}

export const NewPasswordValidate = (values: NewPasswordFormValues) => {
    let errors: FormikErrors<NewPasswordFormValues> = {};




    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be greater than 8 & less than 20 Characters';
    }

    else if (values.password.includes(" ")) {
        errors.password = "Invalid Password: Spaces are not permitted in passwords."
    }

    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*/.test(values.password)) {
        errors.password = "Password must include uppercase, lowercase, number, and special character";
    }



    if (!values.confirm_password) {
        errors.confirm_password = 'Required';
    } else if (values.confirm_password !== values.password) {
        errors.confirm_password = 'Passwords must match';
    }

    return errors
}



export const DetailsValidate = (values: ProjectDetails) => {
    let errors: FormikErrors<ProjectDetails> = {};

    if (!values.template) {
        errors.template = 'Required';
    } 

    if (!values.title) {
        errors.title = 'Required';
    } 


   

    return errors
}

 export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;