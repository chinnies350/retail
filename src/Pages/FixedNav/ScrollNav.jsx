import React, { useState, useEffect } from "react";
import "./Scrollnav.scss"; 
import PublicNavBar from '../HomePage/NavBarcopy'
import UpperMenu from "../../Components/UpperMenu";
export default function App() {
  const [navSize, setnavSize] = useState("5rem");
  const [navColor, setnavColor] = useState("transparent");
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#252734") : setnavColor("transparent");
    window.scrollY > 10 ? setnavSize("5rem") : setnavSize("5rem");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
<>
    
    <PublicNavBar/>


    <div>
 
      <nav
        style={{
          backgroundColor: navColor,
          height: navSize,
          transition: "all 1s"
        }}
      >
        {/* <ul>
          <li>Home</li>
          <li>About</li>
          <li>Project</li>
          <li>Skills</li>
          <li>Contact </li>
        </ul> */}
        <UpperMenu/>
      </nav> 
       
    </div>
    </>
  );
}
