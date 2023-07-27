import React from 'react'
import faqimg from "../../images/faqimg.png"
import Collapses from "../../Components/Collapse"

const Faqs = ({ id }) => {
  return (
    
        <div id={id} className='faqs'>
            <div className='faqsdiv'>
                <div className='faqstext'>
                    <p>Frequently asked questions <br/>
                        about PayPre Restaurant</p>
                </div>
                <div>
                    <img className='faqsimg' src={faqimg}></img>
                </div>
            </div>
            <div className='faqaddson'>
                <Collapses/>
            </div>
        </div>
   
  )
}

export default Faqs
