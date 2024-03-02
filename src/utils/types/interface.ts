// Login Component
export interface ILoginData {
    email: string
    password: string
}
export interface ILoginTouch {
    emailTouch: boolean
    passwordTouch: boolean
}

// SignUp component
export interface ISignupData {
    firstName: string
    lastName: string
    email: string
    password: string
}
export interface ISignupTouch {
    firstNameTouch: boolean
    lastNameTouch: boolean
    emailTouch: boolean
    passwordTouch: boolean
}

// UserCode component
export interface IUserCodeFetchData {
    code: string
    email: string | undefined
}

// Utils > functions > functions.ts
export interface ISignupErrorValidation {
    firstNameError?: string
    lastNameError?: string
    emailError?: string
    passwordError?: string
}
export interface ILoginErrorValidation {
    emailError?: string
    passwordError?: string
}

// INITIAL STATE >> features/fetchPost.ts
export interface IinitialStateFetch {
    loading?: boolean
    data?: any
    errorMsg?: string
}

// INITIAL STATE >> features/fetchGet.ts
export interface IinitialStateFetch {
    loading?: boolean
    data?: any
    errorMsg?: string
}