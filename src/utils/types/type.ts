import { ILoginData, ISignupData, IUserCodeFetchData } from "./interface";

export type userData =
  | ILoginData
  | ISignupData
  | IUserCodeFetchData
  | { code: string }
  | { email: string }
