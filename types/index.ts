//used in app/projects/new-project/components/Stepper.tsx
export interface ProjectDetails {
    template: string;
    title: string;
    members: string[];
  }

 //used in app/projects/new-project/components/Confirmed.tsx
export  interface Details {
    title: string;
    email: string[];
  }
  
export interface SignInFormValues {
    email: string;
    password: string;
}

export interface NewPasswordFormValues {
    confirm_password: string;
    password: string;
}

export interface ForgetFormValues {
    email: string;
}


export interface SignUpFormValues {
    firstName: string;
    lastName: string;
    organizationName: string;
    deptName: string;
    email: string;
    password: string;
    city: string;
    country: string;
}
