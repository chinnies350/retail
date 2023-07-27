import React, { useState, useEffect } from "react"; 
import RetailHome from "../HomePage/RetailPage"
import FixNav from "../FixedNav/ScrollNav"



export default function OverallHome() {
 

  return (
    <div>
         
    <FixNav/>
    <RetailHome/>
       
    </div>
  );
}
