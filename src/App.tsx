import {Suspense, lazy} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthenticationMiddleware } from "./utils/functions/functions";
import { routes } from "./utils/constans/constans";
import "./App.css";

// components
import SuspenseLoading from "./components/suspense-loading/SuspenseLoading";

// pages
const SignUp = lazy(() => import("./pages/sign-up/SignUp"));
const LogIn = lazy(() => import("./pages/log-in/LogIn"));
const OTPLogin = lazy(() => import("./pages/log-in/OTPLogin"));
const UserCode = lazy(() => import("./pages/log-in/UserCode"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const Panel = lazy(() => import("./pages/panel/Panel"));
const EditUser = lazy(() => import("./pages/edit-user/EditUser"));

export default function App() {
  return (
    <main className="w-screen min-h-screen flex justify-center items-center overflow-auto">
      <Suspense fallback={<SuspenseLoading />}>
        <Router>
          <Routes>
            <Route
              path={routes.authenticationMiddleware}
              element={
                <AuthenticationMiddleware />
              }
            />
            <Route path={routes.panel} element={<Panel />} />
            <Route path={routes.editUser('email')} element={<EditUser />} />
            <Route path={routes.signUp} element={<SignUp />} />
            <Route path={routes.logIn} element={<LogIn />} />
            <Route path={routes.OtpLogin} element={<OTPLogin />} />
            <Route path={routes.userCode('email')} element={<UserCode />} />
            <Route path={routes.notFound} element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </main>
  );
}