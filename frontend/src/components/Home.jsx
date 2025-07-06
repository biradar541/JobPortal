import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import Footer from './shared/Footer'
import LatestJobs from './LatestJobs'
import { useDispatch, useSelector } from 'react-redux'
// import store from '../redux/store'
import { setSearchedQuery } from '@/redux/jobSlice';

import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user } = useSelector(store => store.auth);
  const navigate =useNavigate();
  const dispatch =useDispatch();
  // const {setSearchedQuery} = useSelector(store=>store.job);
  useEffect(()=>{
    dispatch(setSearchedQuery(" "));
    if(user && user.role=="recruiter"){
        navigate("/admin/companies");
    }
  })
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
