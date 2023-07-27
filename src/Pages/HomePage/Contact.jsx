import React from 'react'
import contactimg from "../../images/contactimg.png"
import mobileimg from "../../images/mobileimg.png"
import emailimg from "../../images/emailimg.png"


const Contact = () => {
  return (
    <div className='contact'>
        <div className='contactimg'>
            <img src={contactimg}></img>
        </div>
        <div className='contacthelpdiv'>
            <p className='contacttext'>Need Help?</p>
            <div className='contactgrpdiv'>
                <div className='contactgrpmobile'>
                    <div><img className='contacticons' src={mobileimg}></img></div>
                    <div  className='contact_text'>
                        <div className='contactmaintext'><p>&nbsp;&nbsp;Toll-free 1921681254</p></div>
                        <div className='contactsubtext'><p>&nbsp;&nbsp;For Restaurant Upgrading queries</p></div>
                    </div>
            </div>
            <div className='contactgrpemail'>
                <div><img className='contacticons' src={emailimg}></img></div>
                <div>
                    <div className='contactmaintext'><p>&nbsp;&nbsp;info@paypre.in</p></div>
                    <div className='contactsubtext'><p>&nbsp;&nbsp;For Restaurant Upgrading queries</p></div>
                </div>
                
            </div>
        </div>
            
            
            
        </div>
        {/* <div>
            <div className='contactgrp'>
                <div><img className='contacticons' src={emailimg}></img></div>
                <div>
                    <div className='contactmaintext'><p>info@paypre.in</p></div>
                    <div className='contactsubtext'><p>For Restaurant Upgrading queries</p></div>
                </div>
                
            </div>
        </div> */}
    </div>
  )
}

export default Contact
