import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// pages
const SignIn : any = lazy(() => import('./pages/sign-up/SignUp'));
const LogIn : any = lazy(() => import('./pages/log-in/LogIn'));
const OTPLogin : any = lazy(() => import('./pages/log-in/OTPLogin'));
const UserCode : any = lazy(() => import('./pages/log-in/UserCode'));
const ForgetPassword : any = lazy(() => import('./pages/forget-password/ForgetPassword'));
const NotFound : any = lazy(() => import('./pages/not-found/NotFound'));
const Main : any = lazy(() => import('./pages/main/Main'));

export default function App() {

  return (
    <main className='w-screen h-screen'>
      <Suspense fallback>
        <Router>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/sign-in' element={<SignIn />}/>
            <Route path='/log-in' element={<LogIn />}/>
            <Route path='/otp-login' element={<OTPLogin />}/>
            <Route path='/user-code' element={<UserCode />}/>
            <Route path='/forget-password' element={<ForgetPassword />}/>
            <Route path='/*' element={<NotFound />}/>
          </Routes>
        </Router>
      </Suspense>
    </main>
  )
}