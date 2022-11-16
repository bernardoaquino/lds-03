import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { 
  BUSINESS_PROFILE_URL, 
  BUSINESS_SIGNUP_URL,
  INSTITUTION_PROFILE_URL, 
  INSTITUTION_SIGNUP_URL,
  PROFESSOR_PROFILE_URL, 
  PROFESSOR_SIGNUP_URL, 
  STUDENT_PROFILE_URL, 
  STUDENT_SIGNUP_URL, 
  SIGNIN_URL, 
} from './constants';

import SignIn from './pages/SignIn';
import BusinessSignUp from './pages/SignUp/BusinessSignUp';
import BusinessProfile from './pages/Profile/BusinessProfile';
import InstitutionSignUp from './pages/SignUp/InstitutionSignUp';
import InstitutionProfile from './pages/Profile/InstitutionProfile';
import StudentSignUp from './pages/SignUp/StudentSignUp';
import StudentProfile from './pages/Profile/StudentProfile';
import ProfessorProfile from './pages/Profile/ProfessorProfile';
import ProfessorSignUp from './pages/SignUp/ProfessorSignUp';

const routes = [
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: SIGNIN_URL,
    element: <SignIn />
  },
  {
    path: BUSINESS_PROFILE_URL,
    element: <BusinessProfile />
  },
  {
    path: BUSINESS_SIGNUP_URL,
    element: <BusinessSignUp />
  },
  {
    path: INSTITUTION_PROFILE_URL,
    element: <InstitutionProfile />
  },
  {
    path: INSTITUTION_SIGNUP_URL,
    element: <InstitutionSignUp />
  },
  {
    path: PROFESSOR_PROFILE_URL,
    element: <ProfessorProfile />
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
    path: STUDENT_SIGNUP_URL,
    element: <StudentSignUp />
  },
]

export default createBrowserRouter(routes);