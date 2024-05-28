import { FormikErrors } from "formik";


interface AuthFormProps {
    email: string;
    password: string;
}



interface SignInFormValues {
    email: string;
    password: string;
}

interface SetupNewPasswordFormValues {
    confirm_password: string;
    password: string;
    email: string | null | undefined;
}

interface ForgetFormValues {
    email: string;
}

interface SignUpFormValues {
    fullName: string;
    email: string;
    password: string;
}




export const AuthValidate = (values: AuthFormProps) => {
    let errors: FormikErrors<AuthFormProps> = {};

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


    if (!values.fullName) {
        errors.fullName = "Required"
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

export const SetupNewPasswordFormValues = (values: SetupNewPasswordFormValues) => {
    let errors: FormikErrors<SetupNewPasswordFormValues> = {};

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



    if (!values.confirm_password) {
        errors.confirm_password = 'Required';
    } else if (values.confirm_password !== values.password) {
        errors.confirm_password = 'Passwords must match';
    }

    return errors
}


