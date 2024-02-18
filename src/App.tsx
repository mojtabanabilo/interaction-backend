import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./utils/functions/functions";
import "./App.css";

// components
import SuspenseLoading from "./components/suspense-loading/SuspenseLoading";

// pages
const SignUp: any = lazy(() => import("./pages/sign-up/SignUp"));
const LogIn: any = lazy(() => import("./pages/log-in/LogIn"));
const OTPLogin: any = lazy(() => import("./pages/log-in/OTPLogin"));
const UserCode: any = lazy(() => import("./pages/log-in/UserCode"));
const NotFound: any = lazy(() => import("./pages/not-found/NotFound"));
const Panel: any = lazy(() => import("./pages/panel/Panel"));
const EditUser: any = lazy(() => import("./pages/edit-user/EditUser"));

export default function App() {
  return (
    <main className="w-screen min-h-screen flex justify-center items-center overflow-auto">
      <Suspense fallback={<SuspenseLoading />}>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/panel" element={<Panel />} />
              <Route path="/edit-user" element={<EditUser />} />
            </Route>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/otp-login" element={<OTPLogin />} />
            <Route path="/user-code/:email" element={<UserCode />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </main>
  );
}
