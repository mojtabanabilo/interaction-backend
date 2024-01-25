import { ILoginData, ISignupData, IForgetPassword } from "./interface"

export type userData = ILoginData | ISignupData | IForgetPassword | {code: string} | {email: string};