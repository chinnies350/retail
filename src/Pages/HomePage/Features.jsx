import React from 'react'
import whatsappimg from "../../images/whatsappimg.png"
import whatsappicon from "../../images/whatsappicon.png"
import quickaddimg from "../../images/quickaddimg.png"
import quickaddicon from "../../images/quickaddicon.png"
import stock from "../../images/stock.png"
import message from "../../images/message.png"
import quicksell from "../../images/quicksell.png"

const Features = () => {
  return (
    <div className='featuresgrid'>
      <div className='whatsappimg'>
        <div>
          <img className='featuresimg' src={whatsappimg}/>
        </div>
          <div className='whatsapptext'>
            <img src={whatsappicon}/>
            <br/>
            <p>Create 2x speed fast bill  send e-bill via Whatsapp & SMS</p>
            <br/>
            <div className='messageimg'><img src={message}/></div>
          </div>
    </div>
    <div className='quickaddimg'>
      <div className='quickaddtext'>
        <img src={quickaddicon}/>
        <br/>
        <p>Product adding and selling  via QR Code Scanner with very fast</p>
        <br/>
        <div className='messageimg'><img src={quicksell}/></div>
      </div>
      <div>
          <img className='featuresimg' src={quickaddimg}/>
      </div>
            
    </div>
      <div className='whatsappimg'>
        <div>
          <img className='featuresimg' src={stock}/>
        </div>
        <div className='whatsapptext'>
          <p>Manage your stock high accuracy with  our inventory management</p>
        </div>
    </div>
    </div>
    )
    
}

export default Features
