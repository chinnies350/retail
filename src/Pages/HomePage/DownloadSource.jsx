import React, { useState } from 'react'
import Buttons from '../../Components/Buttons'
import { RightOutlined } from '@ant-design/icons';
import playstore from "../../images/playstore.png"
import appstore from "../../images/appstore.png"
import pogplaystore from "../../images/pogplaystore.png"
import barcodeimg from "../../images/barcodeimg.png"
import {useNavigate } from 'react-router-dom';
import { getCookieData } from "../../Services/others";

const subDirectory = import.meta.env.ENV_BASE_URL
const HomesubDirectory = import.meta.env.ENV_HOME_BASE_URL

const DownloadSource = () => {

    const navigate = useNavigate();
    const [UserId, setUserId] = useState(
        getCookieData("UserId") ? getCookieData("UserId") : null
      );

      const reloadPublicSignin=()=>{
      
        navigate(`${HomesubDirectory}public-signin`)
        window.location.reload()
               
      }


  return (
    <div className='downloadsource'>
      <div className='downloaddiv'>
            <div className='downloadtext'>
                <p>Ready to enter the PayPre <br/>
                  Universe - let's set up your <br/>
                  PayPre free account.</p>
            </div>
            {!UserId?
            <div className='downloadbutton'>
                <Buttons buttonText="TRY RESTAURANT" icon={<RightOutlined />}
                handleSubmit={() => reloadPublicSignin()}
                />
            </div>:null}
            <div className='downloadsubtext'><p>No credit card required.</p></div>
        </div>
        <div className='downloadsources'>
            <div className='downloadsourcestext'>
              <p>Download our <br/>
                  PayPre Mobile App</p>
            </div>
            <div className='downloadssrc'>
                {/* <img src={barcodeimg} style={{width: "54.95px",height: "54.95px"}}></img> */}
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
               
            </div>
        </div>
    </div>
  )
}

export default DownloadSource
