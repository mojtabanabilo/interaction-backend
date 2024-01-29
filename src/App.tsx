import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from "./utils/functions/functions";
import './App.css';

// pages
const SignIn : any = lazy(() => import('./pages/sign-up/SignUp'));
const LogIn : any = lazy(() => import('./pages/log-in/LogIn'));
const OTPLogin : any = lazy(() => import('./pages/log-in/OTPLogin'));
const UserCode : any = lazy(() => import('./pages/log-in/UserCode'));
const NotFound : any = lazy(() => import('./pages/not-found/NotFound'));
const Panel : any = lazy(() => import('./pages/panel/Panel'));

export default function App() {

  return (
    <main className='w-screen h-screen'>
      <Suspense fallback>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<Panel />}/>
            </Route>
            <Route path='/sign-in' element={<SignIn />} index/>
            <Route path='/log-in' element={<LogIn />}/>
            <Route path='/otp-login' element={<OTPLogin />}/>
            <Route path='/user-code/:email' element={<UserCode />}/>
            <Route path='/*' element={<NotFound />}/>
          </Routes>
        </Router>
      </Suspense>
    </main>
  )
}