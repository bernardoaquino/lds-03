import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { 
  BUSINESS_SIGNUP_URL, 
  STUDENT_SIGNUP_URL, 
  SIGNIN_URL, 
} from './constants';

import SignIn from './pages/SignIn';
import BusinessSignUp from './pages/SignUp/BusinessSignUp';
import StudentSignUp from './pages/SignUp/StudentSignUp';

const routes = [
  {
    path: SIGNIN_URL,
    element: <SignIn />
  },
  {
    path: STUDENT_SIGNUP_URL,
    element: <StudentSignUp />
  },
  {
    path: BUSINESS_SIGNUP_URL,
    element: <BusinessSignUp />
  },
]

export default createBrowserRouter(routes);