import React from 'react'


import { BsTwitter, BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";

const Footer = () => {
  const categoryData=[{"id":1,"value":"English"},{"id":2,"value":"Tamil"},{"id":3,"value":"Hindi"}]
  return (


    <footer className="footer_container">
    <div>
      <p>Explore</p>
      <ul class="footer-links">
        <li>
          <a href="#">What is PayPre ?</a>
        </li>
        <li>
          <a href="#">Want Access</a>
        </li>
      </ul>
    </div>

    <div>
      <p>Products</p>
      <ul class="footer-links">
        <li>
          <a href="#">Products</a>
        </li>
        <li>
          <a href="#">Free PayPre Apps</a>
        </li>
      </ul>
    </div>

    <div>
      <p>Pricing & Support</p>
      <ul class="footer-links">
        <li>
          <a href="#">Pricing</a>
        </li>
        <li>
          <a href="#">Suppprt</a>
        </li>
      </ul>
    </div>

    <div>
      <p>Resources for PayPre</p>
      <ul class="footer-links">
        <li>
          <a href="#">Documentation</a>
        </li>
        <li>
          <a href="#">Updates</a>
        </li>
        <li>
          <a href="#">Videos</a>
        </li>
      </ul>
    </div>

    <div>
      <p>Join the conversation</p>
      <ul class="social-icons">
        <li>
          <a class="facebook" href="#">
            {" "}
            <BsFacebook />{" "}
          </a>
        </li>
        <li>
          <a class="twitter" href="#">
            {" "}
            <BsTwitter />{" "}
          </a>
        </li>
        <li>
          <a class="dribbble" href="#">
            <BsInstagram />
          </a>
        </li>
        <li>
          <a class="linkedin" href="#">
            <BsYoutube />
          </a>
        </li>
      </ul>
    </div>

    <div class="ft_sub_container">
      <div className="privacycol">
        {" "}
        <a>
          Privacy & Cookies &nbsp; | <a> Data Protection Notice</a> &nbsp;
          | <a>Terms of use</a> &nbsp; | <a>Privacy Data Management</a>{" "}
        </a>{" "}
      </div>
      <div className="copyright-text">
        {" "}
        <a>
          Contact us &nbsp; <a> Feedback</a> &nbsp; <a>Sitemap</a> &nbsp;{" "}
          <a>© Prematix 2023</a>{" "}
        </a>{" "}
      </div>
    </div>
  </footer>


  )
}

export default Footer
