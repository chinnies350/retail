import React, { useState, useEffect, useRef, useCallback } from "react";
import { Form } from "antd";
import NavBarCopy from "../../Pages/HomePage/NavBarcopy";
import { TextAreaInput } from "../../Components/TextArea";
import Buttons from "../../Components/Buttons";
import { ArrowRightOutlined } from "@ant-design/icons";
import Faqs from "../../Pages/HomePage/Faqs";
import Contact from "../../Pages/HomePage/Contact";
import { InputField } from "../../Components/InputField";
import { getCookieData } from "../../Services/others";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Modal } from "antd";
import QRCode from "qrcode.react";
import GooglePay from "../../images/gpay.png";
import PhonePay from "../../images/phonepay.png";
import Wpay from "../../images/wpay.png";
import Paytm from "../../images/paytm.png";
import { RiSmartphoneLine, RiDownloadLine } from "react-icons/ri";
import logo from "../../images/successtick2.png";
import logo1 from "../../images/fav.ico";
import { IoIosTimer } from "react-icons/io";
import { Messages } from "../../Components/Notifications/Messages";
import PdfPage from "../../Pages/PdfDoc/PdfDoc";
import { printDiv } from "../../Services/others";

import { Row, Col } from "antd";
import {
  getPricingType,
  postInvoice,
} from "../../Features/invoiceDetail/invoiceDetail";

import {
  getUserDetails,
  SendPaymentLink,
  CheckPaymentStatus,
  UpdatePayment,
  sharePdfDocument,
  getPaymentUpiDetails
} from "../../features/pricingType/pricingType";

import "./invoiceDetail.scss";
const subDirectory = import.meta.env.ENV_BASE_URL;
const HomeDirectory = import.meta.env.ENV_HOME_BASE_URL;
const MainHomeUrl= import.meta.env.ENV_Main_BASE_URL;
const style = `<style>
*{
  font-family:Poppins;
}
.Pdf-body{  
  background-color: #33585c1f;
  height: 100%;
  margin: 0vw 0vh;
  padding: 1vw 2vh;
}

@media *{
  element.class {
     font-family: "Courier New";
     font-size: 10pt;
  }
  /* You can add additional styles here which you need */
}

.Pdf-Div{
  padding: 1vw 1vh;
  background-color:rgb(255, 255, 255);
  border-radius: 8px; 
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;  
}

.Pdf-head-div{
  padding: 0vw 1vh;
  color: #2b2b2b;
}

.Pdf-head{
  font-size:45px;
  font-weight:600; 
  color: #000000; 
  line-height: 0;
}

.headlogo-img{ 
width: 70px;
}

.Pdf-amt-digit{
font-weight:600;
}
.square {
  height: 240px;
  width: 240px;
  // background-color: #851764;  
  background-color: #f5f5f5; 
  border-radius: 5%;
  display: inline-block; 
  position: relative;
  z-index: -1; 
  margin-top: -18rem;
  margin-left: -2rem;
}

.Pdf-Cont-Div{
  background-color: #ffffff; 
  padding: 0vw 2vh; 
  
}

.Pdf-cont{
  // background-color: #33585c1f;  
  margin: 0vw 0vh;
  padding: 0vw 0vh;
  display: flex;  
  // flex-wrap: wrap;
  row-gap: 1rem;
  justify-content: space-evenly; 
}

.Pdf-amt-details{
  text-align: right;
}


.Pdf-cont-txt{
  padding: 0vw 1vh; 
}

.Pdf-cont-subhead{
  font-size:20px;
  font-weight: 500;
}

.Pdf-cont-text{
  font-size:14px;
}



.Pdf-Table-Div{
  background-color: #ffffff; 
  padding: 3vw 0vh; 
  
}


table {
  // border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  font-family:'Poppins';
}

table caption {
  font-size: 1.2em;
  margin: .0em 0 .95em;
  padding: 1vw 3vh;
  font-family: 'Poppins' !important;
  text-transform: uppercase;
  font-weight:600;
  letter-spacing:3px;
  background-color: #f5f5f5;
}

table tr {

  padding: .35em;
}

table th,
table td {
  padding: 1vw 1vh; 
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}


.table-2div{ 
  text-align: right;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.table-cont2{
  display: flex;
  justify-content: space-evenly;
}

.Pdf-footer-div{
  background-color: #ffffff; 
  padding: 0vw 0vh;  
  display: flex;
  flex-wrap: wrap;
  row-gap: 2rem;
  justify-content: center;
}

.Pdf-footer-subdiv{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  row-gap: 0rem;
  align-items: center;
  width:300px;
  justify-content: space-around;

}
.Pdf-footer-txt1{
  font-size:18px;
  width: 500px;
  font-weight: 600; 
}

.Pdf-footer-txt{
  font-size:13px;
  width: 500px;
}

.Pdf-footer-subdiv-txt-div{ 
  justify-content: space-evenly;
  font-size: 15px;
}

.Pdf-footer-subdiv-txt{
  display: flex;
  align-items: center;
  text-align: left;
  line-height: 0;
  justify-content: start; 
   
}


.logo-img{
  padding: 1vw 1vh;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}

hr.new3 { 
  border-top: 1px dotted   rgb(90, 90, 90); 
}

hr.new4 { 
  border :16px solid    #2e4f53; 
}




@media screen and (max-width: 976px) {

.Pdf-Div{
  display: flex !important; 
  margin: 0vw 0vh !important;  
  flex-direction: row;
  justify-content: space-between !important;
  row-gap: 3rem;
}

.Pdf-head-div{
  display: flex !important; 
  margin: 0vw 7vh !important;
  align-items: center;
  flex-direction: row;
  column-gap: 2rem;
}

.square{
display: none !important;   
}

.Pdf-footer-div { 
justify-content: space-around !important;
}

}
</style>`;

const InvoiceDetail = ({ formType }) => {
  const [open, setOpen] = useState(false);

  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [PricingId, setPricingId] = useState(
    getCookieData("PricingId") ? getCookieData("PricingId") : null
  );
  const [UserId, setUserId] = useState(
    getCookieData("UserId") ? getCookieData("UserId") : null
  );
  const [FeatureList, setFeatureList] = useState([]);
  const [invoiceDetails, setinvoiceDetails] = useState([]);
  const [UserDetails, setUserDetails] = useState([]);
  const [showMobile, setshowMobile] = useState(false);
  const [MobileNo, setMobileNo] = useState(null);
  const [BookingId, setBookingId] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [Buttondisabled, setButtondisabled] = useState(false);
  const [Status, setStatus] = useState(false);
  const [PaymentStatus, setPaymentStatus] = useState(false);
  const [CompanyName, setCompanyName] = useState(null);
  const [zipcode, setzipcode] = useState(null);
  const [address, setaddress] = useState(null);
  const [City, setCity] = useState(null);
  const [showdiv, setshowdiv] = useState(true);
  const [openEmail, setopenEmail] = useState(false);
  const [UpiDetails,setUpiDetails]=useState([])

  const [printdata, setprintdata] = useState([]);
  const [paymentModeSelected,setpaymentModeSelected]=useState([]);

  const [delay, setDelay] = useState(null);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);


  useEffect(() => {
    getUpiPaymentDetails();
  },[])
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);
    if (BookingId != null) {
      checkPayment();
    }

    if (delay === 0) {
      UpdatePaymentStatus();
      clearInterval(timer);
    }

    if (delay === null) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [delay]);

  const UpdatePaymentStatus = async () => {
    let putdata = {};
    putdata["UpdatedBy"] = UserId;
    putdata["PaymentStatus"] = "F";
    putdata["UniqueId"] = BookingId;

    let response = await dispatch(UpdatePayment(putdata)).unwrap();
    if (response?.data?.statusCode === 1) {
      navigate(`${subDirectory}`);
    }
  };

  const checkPayment = async () => {
    let response = await dispatch(CheckPaymentStatus(BookingId)).unwrap();
    if (response?.data?.statusCode === 1) {
      setprintdata(response?.data?.data);
      setPaymentStatus(true);
      setDelay(null);
      setMessageType("success");
      setMessageData("Payment Success!");
      setTimeout(() => {
        redirectAfterPay()
      }, 15000);
    }
  };

  const getUpiPaymentDetails = async()=>{
    let response = await dispatch(getPaymentUpiDetails()).unwrap();
    if (response?.data?.statusCode === 1) {
      setUpiDetails(response?.data?.data)
      setpaymentModeSelected(response?.data?.data[0]?.PaymentUPIDetailsId)
    }

  }

  const redirectAfterPay =async()=>{
    navigate(`${HomeDirectory}landing-page/home`);
        window.location.reload()

  }

  useEffect(() => {
    if (timeLeft === 0) {
      setButtondisabled(false);

      setTimeLeft(null);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    fetchFeature(PricingId);
  }, [PricingId]);

  useEffect(() => {
    getUserDetail();
  }, []);

  const fetchFeature = async (PricingId) => {
    const response = await dispatch(getPricingType(PricingId)).unwrap();
    if (response.data.statusCode === 1) {
      let finalFeatureList = response.data.data.filter(
        (value) => value.ActiveStatus === "A"
      );
      setFeatureList(
        finalFeatureList ? finalFeatureList[0]?.FeatureDetails : []
      );
      setinvoiceDetails(finalFeatureList);
    }
  };

  const getUserDetail = async () => {
    const response = await dispatch(getUserDetails(UserId)).unwrap();
    // const data = await response.data.data;
    // setFeatureCategory(data);
    if (response.data.statusCode === 1) {
      let finalUserDetails = response.data.data;
      setUserDetails(finalUserDetails ? finalUserDetails : []);
      setMobileNo(UserDetails.length > 0 ? UserDetails[0]?.MobileNo : null);
    }
  };

  const onFinalSubmit = async () => {
    let url =`${MainHomeUrl}payment-page?paymentId=${BookingId}&Id=${paymentModeSelected}`
    let response = await dispatch(SendPaymentLink({MobileNo,url})).unwrap();
    if (response.data.statusCode === 1) {
      setMessageType("success");
      setButtondisabled(true);
      setStatus(true);
      setMessageData(response.data.response);
      setTimeLeft(60);
    }
  };

  const onSubmit = async () => {
    console.log(invoiceDetails,"invoiceDetailsinvoiceDetails")
    let newDate = new Date();
    var someDate = new Date();
    var result = someDate.setDate(
      someDate.getDate() +
        parseInt(invoiceDetails != [] ? invoiceDetails[0]?.NoOfDays : 0)
    );
    let postData = {};
    postData["UserId"] = getCookieData("UserId");
    postData["AppId"] = getCookieData("AppId");
    postData["PricingId"] = getCookieData("PricingId");
    postData["PricingId"] = getCookieData("PricingId");
    postData["PurDate"] = moment(newDate);
    postData["NoofDays"] =
      invoiceDetails != [] ? invoiceDetails[0]?.NoOfDays : 0;
    postData["PaymentMode"] = 27;
    //27->upi
    postData["PaymentStatus"] = "P";
    postData["LicenseStatus"] = "A";
    postData["Price"] = invoiceDetails != [] ? invoiceDetails[0]?.Price : 0;
    postData["TaxId"] = invoiceDetails != [] ? invoiceDetails[0]?.TaxId : 0;
    postData["NetPrice"] =
      invoiceDetails != [] ? invoiceDetails[0]?.NetPrice : 0;
    postData["ValidityStart"] = moment(newDate);
    postData["ValidityEnd"] = moment(new Date(result));
    postData["CreatedBy"] = getCookieData("UserId");
    postData["TaxAmount"]=invoiceDetails != [] ? invoiceDetails[0]?.TaxAmount : 0;

    let response = {};
    response = await dispatch(postInvoice(postData)).unwrap();

    if (response.data.statusCode == 1) {
      setBookingId(response?.data?.BookingId);
      setOpen(true);
      setDelay(+240);
    } else {
      setMessageType("error");
      setMessageData(response.data.response);
    }
  };

  const sendLink = () => {
    setshowMobile(true);
  };

  const ChangeToScan = () => {
    setshowMobile(false);
  };

  const MobileNo1 = async (e) => {
    if (e.target.value.length === 10) {
      setMobileNo(e.target.value);
    }
  };

  const onComplete = useCallback(() => {
    setMessageData(null);
    setMessageType(null);
  }, []);

  const PrintReceipt = async () => {
    await printDiv("Pdfbody", style);
  };

  const setCompanyNames = async (e) => {
    setCompanyName(e.target.value);
  };

  const setCitys = async (e) => {
    setCity(e.target.value);
  };

  const setaddresss = async (e) => {
    setaddress(e.target.value);
  };
  const setzipcodes = async (e) => {
    setzipcode(e.target.value);
  };
  const showemaildiv = async (e) => {
    setopenEmail(true);
  };
  const onFinish = async (values) => {
    let data={
      "UniqueId":BookingId,
      "MailId":values.EmailId,
      "Link":`${MainHomeUrl}payment-page?paymentId=${BookingId}&Id=${paymentModeSelected}`}

 
    let response = await dispatch(sharePdfDocument({data})).unwrap();
    if (response?.data?.statusCode === 1) {
      setMessageType("success");
      setMessageData("Receipt Sended Successfully");
    }
    setopenEmail(false);
    formRef.resetFields();

  };

  console.log(UpiDetails,"UpiDetailsUpiDetails",paymentModeSelected)

  const handelPaymentMode=async(e)=>{
    setpaymentModeSelected(e)

  }



  return (
    <>
      <div style={{ display: "none" }}>
        <PdfPage
          printingdata={printdata}
          CompanyName={CompanyName}
          zipcode={zipcode}
          address={address}
          City={City}
        />
      </div>

      <Messages
        messageType={messageType}
        messageData={messageData}
        onComplete={onComplete}
      />
      <NavBarCopy />
      <div className="invoice-detail-bg">
        <div className="invoice-detail-div">
          <div className="Invoice-detail-cont">
            <p className="invoice-1st-txt"> Flexible & transparent pricing </p>
            <div className="invoice-2nd-txt">
              No Contracts. No surprise fees. &nbsp;{" "}
              <p> Pay less by using more</p>{" "}
            </div>

            {/* <div className="invoice-toggle">
              <div className="monthtext">
                Monthly &nbsp; &nbsp; <Toggle defaultChecked={true} />
              </div>

              <div className="yeartext">
                {" "}
                &nbsp; &nbsp; Yearly{" "}
                <button className="discountdiv"> 10% Discount &nbsp; </button>
              </div>
            </div> */}

            <div className="invoice-drop-items">
              {FeatureList?.map((a, b) => (
                <div className="invoice-4th-row">
                  {" "}
                  {a?.FeatName}&nbsp;&nbsp;
                  <InputField
                    fieldState={true}
                    fieldApi={true}
                    autocomplete="off"
                    type="numeric"
                    label="Constraint"
                    id="Constraint"
                    value={a?.FeatConstraint}
                    isOnChange={true}
                    disabled={true}
                    field="Constraint"
                  />
                </div>
              ))}
            </div>

            <div className="Invoice-details-bg">
              <p className="Invoice-details-tittle"> Invoice Details </p>

              <div className="Invoice-details-fields">
                <div className="Invoice-fields">
                  <InputField
                    fieldState={true}
                    fieldApi={true}
                    autocomplete="off"
                    type="numeric"
                    label="Mobile Number"
                    id="MobileNo"
                    value={
                      UserDetails.length > 0 ? UserDetails[0]?.MobileNo : ""
                    }
                    isOnChange={true}
                    disabled={true}
                    field="MobileNo"
                    maxlength="10"
                  />
                </div>

                <div>
                  <InputField
                    fieldState={true}
                    fieldApi={true}
                    autocomplete="off"
                    type="numeric"
                    label="COMPANY / BILLING NAME"
                    id="MobileNo"
                    field="MobileNo"
                    maxlength="10"
                    onChange={(e) => setCompanyNames(e)}
                  />
                </div>

                <div>
                  <InputField
                    fieldState={true}
                    fieldApi={true}
                    autocomplete="off"
                    type="numeric"
                    label="CITY"
                    id="MobileNo"
                    field="MobileNo"
                    maxlength="10"
                    onChange={(e) => setCitys(e)}
                  />
                </div>

                <div>
                  <InputField
                    fieldState={true}
                    fieldApi={true}
                    autocomplete="off"
                    type="numeric"
                    label="ZIP"
                    id="MobileNo"
                    field="MobileNo"
                    maxlength="10"
                    onChange={(e) => setzipcodes(e)}
                  />
                </div>

                <div>
                  <TextAreaInput
                    field="AppDescription"
                    autoComplete="off"
                    label="ADDRESS"
                    fieldState={true}
                    fieldApi={true}
                    isOnChange={formType == "edit" ? true : false}
                    onChange={(e) => setaddresss(e)}
                  />
                </div>
              </div>

              <div className="Invoice-details-pricedetails">
                <p className="pricedetails-details-tittle"> Price Details</p>

                <div className="pricedetails-div">
                  <div className="pricedetails-details">
                    <div className="pricedetails-Amtdetail">
                      <div className="Amtdetail-txt">
                        <p> Sub Total </p>
                        <p>
                          {" "}
                          {invoiceDetails != [] ? invoiceDetails[0]?.Price : 0}
                        </p>
                      </div>
                      {invoiceDetails[0]?.TaxAmount ? (
                        <div className="Amtdetail-txt">
                          <p> Tax % </p>
                          <p>
                            {" "}
                            {invoiceDetails != []
                              ? invoiceDetails[0]?.TaxAmount != null
                                ? invoiceDetails[0]?.TaxAmount
                                : 0
                              : 0}
                          </p>
                        </div>
                      ) : null}

                      <div className="Amtdetail-txt">
                        <p className="AmPay"> Amount Payable </p>
                        <p className="AmPay">
                          {" "}
                          {invoiceDetails != []
                            ? invoiceDetails[0]?.NetPrice
                            : 0}{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pricedetails-prcedbutton">
                    <Buttons
                      type="submit"
                      buttonText="PROCEED TO PAY"
                      className="sbmt-btn"
                      handleSubmit={onSubmit}
                      icon={<ArrowRightOutlined />}
                    ></Buttons>

                    <a className="prcdPay">
                      {" "}
                      By proceeding, you agree to our Privacy Policy{" "}
                    </a>

                    <Modal
                      title={
                        <p className="logodiv">
                          <img className="logoStyle" src={logo1} alt="logo" />
                          PAYMENT OPTIONS{" "}
                        </p>
                      }
                      centered
                      open={open}
                      // onCancel={() => setOpen(false)}
                      width={1200}
                    >
                      <div className="Pay_options-div">
                        <Row>
                          <Col>
                            <div className="Pay_options">
                              <div className="Pay_options-fields">
                                {!showMobile ? (
                                  <div className="Pay_options-imgfield">
                                  
                                    <QRCode
                                      value={`${MainHomeUrl}payment-page?paymentId=${BookingId}&Id=${paymentModeSelected}`}
                                    />
                                    <p> Scan & Pay ! </p>
                                   
                               {UpiDetails.length>1 &&
                                    <div className="Upi-imgfield"> 

                                {UpiDetails?.map((a,b)=> a?
                                <button className={"Upi-img"} id={paymentModeSelected===a.PaymentUPIDetailsId?"activeData":null}> <img src={a.ModeName==="Paytm"?Paytm:a.ModeName==="GooglePay"?GooglePay:a.ModeName==="PhonePay"?PhonePay:null}  
                                className="Upi-imgG" alt={a.ModeName} onClick={()=>handelPaymentMode(a.PaymentUPIDetailsId)} /> </button>:null
                                     )}
                                    </div>
                                }
                                 or
{/* } */}
                                    <button
                                      className="switch-pay-btn"
                                      onClick={() => sendLink()}
                                    >
                                      {" "}
                                      Get UPI Link <ArrowRightOutlined />{" "}
                                    </button>
                                    <h className="timersec">
                                      {" "}
                                      <IoIosTimer /> {minutes}:{seconds}{" "}
                                    </h>
                                  </div>
                                ) : null}

                                {showMobile ? (
                                  <div className="Pay_options-inpfield">
                                    <Form
                                      ref={formRef}
                                      onFinish={onFinalSubmit}
                                    >
                                      <div className="inputfieldstyle">
                                        <Form.Item
                                          name="MobileNo"
                                          hasFeedback
                                          rules={[
                                            {
                                              required: true,
                                            },
                                          ]}
                                        >
                                          <InputField
                                            fieldState={true}
                                            fieldApi={true}
                                            autocomplete="off"
                                            type="numeric"
                                            onChange={MobileNo1}
                                            label="Mobile Number"
                                            id="MobileNo"
                                            field="MobileNo"
                                            maxlength="10"
                                            suffix={
                                              <RiSmartphoneLine className="site-form-item-icon " />
                                            }
                                          />
                                        </Form.Item>

                                        <div className="prcd-btn">
                                          <Buttons
                                            type="submit"
                                            buttonText={
                                              Status === true
                                                ? "ReSend UPI Link"
                                                : "Send UPI Link"
                                            }
                                            disabled={Buttondisabled}
                                            icon={<ArrowRightOutlined />}
                                          ></Buttons>
                                        </div>
                                        {/* {timeLeft > 0 ? (
                                          <h class="timerSecTwo">
                                            {" "}
                                            Resend link in : {timeLeft} Sec
                                          </h>
                                        ) : null} */}
                                      </div>
                                    </Form>
                                    (or)
                                    <button
                                      className="switch-pay-btn"
                                      onClick={() => ChangeToScan()}
                                    >
                                      {" "}
                                      SCAN & PAY <ArrowRightOutlined />{" "}
                                    </button>
                                    <a className="tc-apply">
                                      {" "}
                                      *Terms & Conditions apply !{" "}
                                    </a>
                                    {/* <div className="Pay_options-inpimgfield">
                                      {" "}
                                      <img src={Gpay} /> <img src={PPay} />{" "}
                                      <img src={Wpay} /> <img src={Paytm} />{" "}
                                    </div> */}
                                    {UpiDetails.length>1 &&
                                    <div className="Upi-imgfield"> 

                                {UpiDetails?.map((a,b)=> a?
                                <button className={"Upi-img"} id={paymentModeSelected===a.PaymentUPIDetailsId?"activeData":null}> <img src={a.ModeName==="Paytm"?Paytm:a.ModeName==="GooglePay"?GooglePay:a.ModeName==="PhonePay"?"PhonePay":null}  
                                className="Upi-imgG" alt={a.ModeName} onClick={()=>handelPaymentMode(a.PaymentUPIDetailsId)} /> </button>:null
                                     )}
                                    </div>
                                }
                                    <h className="timersec">
                                      {" "}
                                      Remaining Time <IoIosTimer /> {minutes}:
                                      {seconds}{" "}
                                    </h>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          <Col lg={{ span: 8, offset: 1 }}>
                            <div className="Pay_options">
                              <div className="Pay_options-fields">
                                <div className="Pay_options-imgfield"></div>

                                <div className="Invoice-cont">
                                  {PaymentStatus ? (
                                    <img src={logo} className="success-img" />
                                  ) : null}
                                  {PaymentStatus ? (
                                    <div className="Invoice-cont-headcont">
                                      <p className="Invoice-cont-head">
                                        {" "}
                                        Payment Success !{" "}
                                      </p>
                                      <p className="Invoice-cont-sub">
                                        {" "}
                                        Your payment has been successfully done
                                        !
                                      </p>
                                    </div>
                                  ) : null}

                                  {!PaymentStatus ? (
                                    <img src={logo1} className="success-img" />
                                  ) : null}

                                  {!PaymentStatus ? (
                                    <div className="Invoice-cont-headcont">
                                      <p className="Invoice-cont-head">
                                        {" "}
                                        Purchase Invoice{" "}
                                      </p>
                                    </div>
                                  ) : null}
                                  <hr class="new2" />
                                  <div className="Invoice-Amtdetails">
                                    <div className="Invoice-Amtdetail-txt">
                                      <p> Amount </p>
                                      <p>
                                        {" "}
                                        {invoiceDetails != []
                                          ? invoiceDetails[0]?.Price
                                          : 0}
                                      </p>
                                    </div>
                                    {invoiceDetails[0]?.TaxAmount ? (
                                      <div className="Invoice-Amtdetail-txt">
                                        <p> Tax </p>
                                        <p>
                                          {" "}
                                          {invoiceDetails != []
                                            ? invoiceDetails[0]?.TaxAmount !=
                                              null
                                              ? invoiceDetails[0]?.TaxAmount
                                              : 0
                                            : 0}
                                        </p>
                                      </div>
                                    ) : null}
                                    <div className="Invoice-Amtdetail-txt">
                                      <p className="Invoice-AmPay">
                                        Net Amount
                                      </p>
                                      <p className="Invoice-AmPay">
                                        {" "}
                                        {invoiceDetails != []
                                          ? invoiceDetails[0]?.NetPrice
                                          : 0}{" "}
                                      </p>
                                    </div>
                                  </div>

                                  <hr class="new3" />
                                </div>
                                {PaymentStatus ? (
                                  <button
                                    className="Invoice-dwld-btn"
                                    onClick={PrintReceipt}
                                  >
                                    {" "}
                                    Get PDF Receipts <RiDownloadLine />{" "}
                                  </button>
                                ) : null}
                                {PaymentStatus ? (
                                <div className="mail-div">
                                  <a onClick={showemaildiv}>
                                    {" "}
                                    :: Send Invoice to Another e-mail ::
                                  </a>
                                  {openEmail ? (
                                    <Form
                                      ref={formRef}
                                      className="formDivAnt"
                                      onFinish={onFinish}
                                    >
                                      <div className="mail-inp-btn">
                                        <Form.Item
                                          name="EmailId"
                                          hasFeedback
                                          rules={[
                                            {
                                              validator: (_, value) => {
                                                if (
                                                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                                                    value
                                                  )
                                                ) {
                                                  return Promise.resolve();
                                                } else {
                                                  return Promise.reject(
                                                    "Please Enter Valid Email"
                                                  );
                                                }
                                              },
                                            },
                                          ]}
                                        >
                                          <InputField
                                            fieldState={true}
                                            fieldApi={true}
                                            autocomplete="off"
                                            type="numeric"
                                            // onChange={MobileNo1}
                                            label="Email Id"
                                            id="EmailId"
                                            field="MobileNo"
                                            maxlength=""
                                          />
                                        </Form.Item>
                                      </div>
                                      <button className="mail-btn" type="submit">
                                          {" "}
                                          SHARE{" "}
                                        </button>
                                    </Form>
                                  ) : null}
                                </div>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {" "}
              <Faqs />{" "}
            </div>
            <div>
              {" "}
              <Contact />{" "}
            </div>
          </div>

          <div className="ftr_cont">
            <footer className="footer_container">
              <div class="ft_sub_container">
                <div className="privacycol">
                  {" "}
                  <a>
                    Privacy & Cookies &nbsp; | <a> Data Protection Notice</a>{" "}
                    &nbsp; | <a>Terms of use</a> &nbsp; |{" "}
                    <a>Privacy Data Management</a>{" "}
                  </a>{" "}
                </div>
                <div className="copyright-text">
                  {" "}
                  <a>
                    Contact us &nbsp; <a> Feedback</a> &nbsp; <a>Sitemap</a>{" "}
                    &nbsp; <a>© Prematix 2023</a>{" "}
                  </a>{" "}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
  // }
};

export default InvoiceDetail;
