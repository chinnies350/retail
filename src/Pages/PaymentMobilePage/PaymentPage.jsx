import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Messages } from "../../Components/Notifications/Messages";


import { getUserMappDetails,getPaymentUpiDetails,getPaymentModeDetails } from "../../features/pricingType/pricingType";
import logo from "../../images/fav.ico";
import {ArrowRightOutlined} from '@ant-design/icons';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url_string = window.location.href;
  var url = new URL(url_string);
  var id = url.searchParams.get("paymentId");
  var PaymentModeId = url.searchParams.get("Id");

  const [BookingId, setBookingId] = useState(id ? id : null);
  const [BookingDeatils, setBookingDeatils] = useState([]);
  const [messageType, setMessageType] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [PayButton, setPayButton] = useState(false);
  const [UpiDetails,setUpiDetails]=useState([])

  useEffect(() => {
    PaymentDetailsByBookingId();
    getUpiPaymentDetails(PaymentModeId);
  }, []);




  const PaymentDetailsByBookingId = async () => {
    let response = await dispatch(getUserMappDetails(BookingId)).unwrap();
    if (response?.data?.statusCode === 1) {
  
      if (response?.data?.data[0].PaymentStatus === "P") {
        setBookingDeatils(response?.data?.data);
        setPayButton(true);
      } else {
        setBookingDeatils(response?.data?.data);
        setMessageType("error");
        setMessageData("Sorry, Payment Link Expired");
        setPayButton(false);
      }
    }
  };

  const RedirectIntent = async()=>{
    let TranName=BookingId+""+BookingDeatils[0]?.AppName
    var win = window.open('intent://play.google.com/store/apps/details?id=com.prematix.paypreupilite&launch=true&url-para=upi://pay?pa=' + UpiDetails[0].UPIId + '&pn=' + UpiDetails[0].Name + '&tid=' + UpiDetails[0].MerchantId + '&tr='
    + BookingId + '&tn=' + TranName + '&am=' + BookingDeatils[0]?.NetPrice + '&cu=INR&url=&mc=' + UpiDetails[0].MerchantCode + '&type=boating#Intent;scheme=https;action=android.intent.action.VIEW;package=com.android.vending;end', "_blank", "height=600, width=400, status=yes, toolbar=no, menubar=no, location=no,addressbar=no");


    // const data = window.open('intent://prematix.solutions/Preparking_Public?url-para=`upi://pay?pa=' + UpiDetails[0].UPIId +
    // '&pn=' + UpiDetails[0].Name + '&tr=' + BookingId + '&tn=' + "4" + 'Ticket' + '&am=' + BookingDeatils[0]?.NetPrice + '&cu=INR&url=&parking-name=' + "6"
    // + '&merchant-code=' + UpiDetails[0].MerchantCode + '&mode=' + UpiDetails[0].mode + '&orgid=' + UpiDetails[0].orgid + '&sign=' + UpiDetails[0].sign +
    // '`#Intent;scheme=http;package=com.prematix.paypreupilite;end')

 

  }

 
  const onComplete = useCallback(() => {
    setMessageData(null);
    setMessageType(null);
  }, []);

  const getUpiPaymentDetails = async(e)=>{
    let response = await dispatch(getPaymentModeDetails(e)).unwrap();
    if (response?.data?.statusCode === 1) {
      setUpiDetails(response?.data?.data)
    }

  }


  

  // const sss = window.open('intent://prematix.solutions/Preparking_Public?url-para=`upi://pay?pa=' + TranUpiId +
  //           '&pn=' + MerchantName + '&tr=' + bookingid.value + '&tn=' + parkingname.value + 'Ticket' + '&am=' + amount.value + '&cu=INR&url=&parking-name=' + parkingname.value
  //           + '&merchant-code=' + MerchantCode + '&mode=' + mode + '&orgid=' + orgid + '&sign=' + sign +
  //           '`#Intent;scheme=http;package=com.prematix.paypreupilite;end');
  return (
    <>
      <Messages
        messageType={messageType}
        messageData={messageData}
        onComplete={onComplete}
      />
      <div className="payment-page-div">
        <div className="payment-page-cont"> 

        {/* <div className="bg-img"> <img src={BG} />  </div> */}
 
        <img src={logo} className="payment-logo-img"/> 
        <div className="payment-txt-cont">  
        <p> Checkout </p> 
        <p className="payment-sub-head"> UPI Transaction Details</p>
        </div>

      <div className="payment-Amtdetails"> 
        <div className="Invoice-Amtdetails" > 

            <div className="Invoice-Amtdetail-txt">
            <p> App Name  </p>
            <p className="payment-Amtdetail-txt"  >: {BookingDeatils?BookingDeatils[0]?.AppName:null}</p>
            </div>  

            <div className="Invoice-Amtdetail-txt">
            <p> Pricing Name  </p>
            <p>: {BookingDeatils?BookingDeatils[0]?.PricingName:null}</p>
            </div> 

            <div className="Invoice-Amtdetail-txt">
            <p> Mobile Number </p>
            <p className="payment-Amtdetail-txt" >: {BookingDeatils?BookingDeatils[0]?.MobileNo:null}  </p>
            </div>  

            <div className="Invoice-Amtdetail-txt">
            <p> Transaction No </p>
            <p>: {BookingDeatils?BookingDeatils[0]?.UniqueId:null} </p>
            </div>  

            <div className="Invoice-Amtdetail-txt">
            <p className="Invoice-AmPay"> Net Amount</p>
            <p className="Invoice-AmPay">: {BookingDeatils?BookingDeatils[0]?.NetPrice:null} </p>
            </div>  
        </div>  
        {PayButton?
        <button className="payment-pay-btn" onClick={RedirectIntent}> Pay Now  <ArrowRightOutlined/>   </button>:null
}
 
      </div>
 

        </div>
      </div>
    </>
  );
};

export default PaymentPage;
