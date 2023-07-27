import { useState,useEffect } from 'react'
import NavBar from './NavBar'
import Overview from './Overview'
import Features from './Features'
import Pricing from './Pricing'
import Faqs from './Faqs'
import DownloadSource from './DownloadSource'
import Contact from './Contact'
import Footer from './Footer'
import UpperMenu from '../../Components/UpperMenu'
import '../../index.scss' 
import "../../fonts/Gilroy/stylesheet.css";
import AOS from "aos";  
import { Routes, Route } from "react-router-dom";
// import Signin from './publicsignin/Signin'
// import PublicSignup from "./PublicSignup/Signup.jsx"
import FixedNav from '../FixedNav/ScrollNav'
import PublicNavBar from './NavBarcopy'

const RetailPage = () => {

  
useEffect(() => {
  
  AOS.init({
    // initialise with other settings
    duration: 2000,
  });
}, []);


  return (
<> 
    {/* <Routes>
      <Route path='public-signin' element={<Signin/>}/>
    </Routes> */}
    
    <div className="appPage">   
    <FixedNav/>   
      <div className="navbar"> 
      <PublicNavBar/>   
      </div> 
      <div className="contentPage"> 
    
    <div className="Uppernav"> 
    <div className='AppBg'><UpperMenu /></div> 
    </div>
   
    <div className="Content__"> 
   
        <section id="overviewSection">
        <div data-aos="zoom-out-up">
            <Overview /> 
            </div>
        </section>
        <section id="featuresSection"> 
          <Features /> 
        </section>
        <section id="pricingSection">
          <Pricing />
        </section>
        <section id="faqsSection">
          <Faqs />
        </section>
        <DownloadSource />
        <section id="ContactSection">
        <Contact />
        </section>
        <Footer />
    </div>
      </div>
    </div>
    </>
  );
};


export default RetailPage
