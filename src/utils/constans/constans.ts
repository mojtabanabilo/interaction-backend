// App.tsx --- Routes
export const routes = {
  authenticationMiddleware: "/",
  panel: "/panel",
  editUser: (dynamicRoute: string) => `/edit-user/:${dynamicRoute}`,
  signUp: "/sign-up",
  logIn: "/log-in",
  OtpLogin: "/otp-login",
  userCode: (dynamicRoute: string) => `/user-code/:${dynamicRoute}`,
  notFound: "/*",
};
// App.tsx --- Routes