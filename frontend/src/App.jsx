import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Button} from "./components/ui/button"
import Navbar from "./components/shared/Navbar"
import './App.css'
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import { Toaster } from 'react-hot-toast';
import Jobs from './components/Jobs'
import JobDescription from './components/JobDescription'
import Profile from './components/Profile'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Browse from './components/Browse'

const appRouter = createBrowserRouter([
 {
   path:'/',
  element:<Home/>
 },
 {
  path:'/login',
  element:<Login/>
 },
 {
  path:'/register',
  element:<Signup/>
 },
 {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute> <CompanySetup/></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute> <AdminJobs/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute> <PostJob/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
])
function App() {
 
  return (
    <>
       <Toaster position="bottom-right" />
      <RouterProvider router ={appRouter}/>
    </>
  )
}

export default App
