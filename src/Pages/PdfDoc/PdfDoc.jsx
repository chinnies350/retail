import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PdfDoc.scss"
import logo from "../../images/payprelogo1.svg"
import { PhoneOutlined,MailOutlined,EnvironmentOutlined } from '@ant-design/icons';
import moment from 'moment';
import PayPreLogo from "../../images/Payprelogo.png";

const PdfPage =({printingdata,CompanyName,zipcode,address,City})=>{

    console.log(printingdata,CompanyName,zipcode,address,City,"printingdataprintingdata")

   


    return (
        <>
        <div className="Pdf-body" id="Pdfbody"> 
        <div className="Pdf-Div"> 
        <div className="Pdf-head-div">
                <img src={PayPreLogo} className="headlogo-img" /> 
                <div> 
                <p className="Pdf-head"> Invoice </p>
                <p style={{fontFamily: 'Poppins',color:"green"}}> PayPre Private Limited </p>
                </div>
                <span class="square"></span> 
            </div> 

            <div className="Pdf-amt-details">
                <p> Invoice Number : <span className="Pdf-amt-digit"> {printingdata.length>0?printingdata[0].UniqueId:null} </span> </p>
                <p> Amount: <span className="Pdf-amt-digit">₹ {printingdata.length>0?printingdata[0].NetPrice:null} </span> </p>
            </div>
            <div className="Pdf-amt-details"> 
                <p> Payment Method : <span className="Pdf-amt-digit"> {printingdata.length>0?printingdata[0].PaymentModeName:null} </span></p>
                <p> Date : <span className="Pdf-amt-digit"> {printingdata.length>0?moment(printingdata[0].PurDate).format('l'):null} </span> </p>
                
            </div>   
        </div> 

         
        <div className="Pdf-Cont-Div">  

            <div className="Pdf-cont"> 
            <div className="Pdf-cont-txt" >
                <p className="Pdf-cont-subhead" > Billed From</p>
                <p className="Pdf-cont-text"> 
                    Paypre ,
                    51, Step colony, Dharga, 
                    Hosur - 635 126, 
                    Tamilnadu, India. 
                    <p>Phone : +91 9344644484, 9445222716</p>   
                </p>
            </div>
            <div  className="Pdf-cont-txt" >
                <p className="Pdf-cont-subhead"> Billed To </p>
                <p className="Pdf-cont-text"> 
                
                {printingdata.length>0?printingdata[0].UserName!=null?printingdata[0].UserName:printingdata[0].MobileNo:""},<br/>
                <p className="Pdf-cont-text"> 
                {CompanyName!=null?CompanyName:null}
                </p>
                {address!=null?address:null}{" "}
                {City!=null?City:null}{" "}
                {zipcode!=null?zipcode:null}
                    <p>Phone : {printingdata.length>0?printingdata[0].MobileNo:null}</p>   
                </p>
            </div> 

            </div>
            
        </div> 
 
 
        <hr class="new3"/>


        <div className="Pdf-Table-Div">  
            <table>
            <caption>Statement Summary</caption>
            <thead>
                <tr>
                <th scope="col">Description</th>
                <th scope="col">Purchase Date</th>
                <th scope="col">Period</th>
                <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td data-label="Account">{printingdata.length>0?printingdata[0].AppName:null}</td>
                <td data-label="Due Date">{printingdata.length>0?moment(printingdata[0].PurDate).format('l'):null}</td>
                <td data-label="Period">{printingdata.length>0?moment(printingdata[0].ValidityStart).format('l'):null} - {printingdata.length>0?moment(printingdata[0].ValidityEnd).format('l'):null}</td>
                <td data-label="Amount">₹{printingdata.length>0?printingdata[0].NetPrice:null}</td> 
                </tr>
            </tbody>    
            </table>    
        </div> 

        <hr class="new3"/>


        <div className="Pdf-Table-Div">  
            <table> 
        
            <tbody>
                <tr>
                <th> </th>
                <th> </th> 
                <th data-label="Sub Total">Sub Total</th>
                <td>₹{printingdata.length>0?printingdata[0].Price:null}</td>   
                </tr>

                <tr>
                <td> </td>
                <td> </td>
                <th data-label="Tax">Tax  </th>
                <td >₹{printingdata.length>0?printingdata[0].TaxAmount:0}</td> 
                </tr>

                <tr>
                <th> </th>
                <th> </th> 
                <th data-label="Total">Total</th>
                <td >₹{printingdata.length>0?printingdata[0].NetPrice:null}</td>   
                </tr>

            </tbody>    
            </table>    
        </div> 

        <div className="Pdf-footer-div"> 
            <div>
                <p className="Pdf-footer-txt1"> Terms & Conditions </p> 
                <p className="Pdf-footer-txt"> 
                These Buying Terms and Conditions (the "Agreement") 
                set forth the terms and conditions governing the purchase of 
                goods or services (collectively referred to as "Products") 
                from a seller or vendor (referred to as the "Seller") 
                by a buyer (referred to as the "Buyer"). By placing an order for Products, 
                the Buyer agrees to be bound by this Agreement.
                </p>
           </div>

           <div className="Pdf-footer-subdiv" >

              <div  className="Pdf-footer-subdiv-txt-div">
                    <p  className="Pdf-footer-subdiv-txt"> <PhoneOutlined /> &nbsp;  87569876216</p>
                    <p  className="Pdf-footer-subdiv-txt"> <MailOutlined/> &nbsp;  paypre@info.com</p>
                    <p  className="Pdf-footer-subdiv-txt"> <EnvironmentOutlined /> &nbsp;  Hosur-Tamilnadu, India. </p> 
             </div> 

             <div>
             <img src={PayPreLogo} className="logo-img" /> 
             </div>

           </div> 
        </div>

        <hr className="new4"/>

        </div>
        </>
    )
}



export default PdfPage;