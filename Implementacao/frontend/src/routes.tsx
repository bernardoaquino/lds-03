import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { 
  BUSINESS_PROFILE_URL, 
  BUSINESS_SIGNUP_URL,
  PROFESSOR_PROFILE_URL, 
  PROFESSOR_SIGNUP_URL, 
  STUDENT_PROFILE_URL, 
  STUDENT_SIGNUP_URL, 
  SIGNIN_URL, 
} from './constants';

import SignIn from './pages/SignIn';
import BusinessSignUp from './pages/SignUp/BusinessSignUp';
import ProfessorSignUp from './pages/SignUp/ProfessorSignUp';
import StudentSignUp from './pages/SignUp/StudentSignUp';
import BusinessProfile from './pages/Profile/BusinessProfile';
import ProfessorProfile from './pages/Profile/ProfessorProfile';
import StudentProfile from './pages/Profile/StudentProfile';

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
  {
    path: PROFESSOR_SIGNUP_URL,
    element: <ProfessorSignUp />
  },
  {
    path: STUDENT_PROFILE_URL,
    element: <StudentProfile />
  },
  {
    path: PROFESSOR_PROFILE_URL,
    element: <ProfessorProfile />
  },
  {
    path: BUSINESS_PROFILE_URL,
    element: <BusinessProfile />
  },
]

export default createBrowserRouter(routes);