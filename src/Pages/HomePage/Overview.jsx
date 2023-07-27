import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import playstore from "../../images/playstore.png"
import appstore from "../../images/appstore.png"
import pogplaystore from "../../images/pogplaystore.png"
import Buttons from '../../Components/Buttons'
import { RightOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import "../../fonts/Gilroy/stylesheet.css"
import {BannerImageSelector,getBannerImage} from '../../features/application/bannerImage';
import { getCookieData } from "../../Services/others";

const subDirectory = import.meta.env.ENV_BASE_URL
const HomesubDirectory = import.meta.env.ENV_HOME_BASE_URL


const Overview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bannerImages  = useSelector(BannerImageSelector);
    const [UserId, setUserId] = useState(
        getCookieData("UserId") ? getCookieData("UserId") : null
      );
    

    useEffect(() => {
        // Dispatch the getBannerImage thunk
        dispatch(getBannerImage());
        }, []);

    // Get the first banner image from the array
    const firstBannerImage = bannerImages?.data?bannerImages.data[0]?.BannerImage:'' ;

    const reloadPublicSignin=()=>{
      
        navigate(`${HomesubDirectory}public-signin`)
        window.location.reload()
               
      }


  return (
    <div className='overview'>
        <div className='overview-imgblock'>
        {firstBannerImage && <img src={firstBannerImage} style={{ width: "100%" }} alt="Banner Image" />}
            {/* <img src={overviewImg} style={{width:"100%"}}></img> */}
        </div>
        <div className='overview-textblock'>
            <div className='overviewblock'>
            <p>POS App For Restaurant with 
                & without GST fastest e-bill &  normal Billing + KOT and  Stock Management</p>
            </div>
           
            <div className='overview-subtextblock'>
                    <p>Restaurant POS Smart Ordering via QR Code and Send Bill Via
                    through SMS or Whatsapp very fast within min.</p>
                </div>
            {!UserId?
            
            <div className='overview-button'>
                <Buttons buttonText="START FREE" style={{marginTop: "1rem !important"}} icon={<RightOutlined />} 
                handleSubmit= {() => 
                    
                    reloadPublicSignin()
                }
                   
              
                 
                />
            </div>:null
            }
            <div className='overview-downloads'>
                <div className='overview-downloads-grp'>
                    <div>
                        <img src={playstore}/>
                    </div>
                    <div>
                        <p>Download App from Google Playstore</p>
                    </div>
                </div>
                <div className='overview-downloads-grp'>
                    <div>
                        <img src={appstore}/>
                    </div>
                    <div>
                        <p>Download App from Appstore</p>
                    </div>
                </div>
                <div div className='overview-downloads-grp'>
                    <div>
                        <img src={pogplaystore}/>
                    </div>
                    <div>
                        <p>Download POS App from Playstore</p>
                    </div>
                </div>
                {/* <button className='playstorebtn'><img src={playstore}/><p>Download App from Google Playstore</p></button>
                <button className='appstorebtn'><img src={appstore}/><p>Download App from Appstore</p></button>
                <button className='posplaystoebtn'><img src={pogplaystore}/><p>Download POS App from Playstore</p></button> */}
            </div>
        </div>
        
    </div>
  )
}

export default Overview
