import React from 'react'
import './footer.css'
import { AiFillFacebook,AiOutlineTwitter,AiFillInstagram } from "react-icons/ai";
export const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>&copy; 2024 Your E-Learning Platform. All rights reserved.<br></br>
           Made With ❤ <a href='/'>Saqib Mir</a> </p>
           <div className="social-links">
            <a href=""><AiFillFacebook /></a>
            <a href=""><AiOutlineTwitter /></a>
            <a href=""><AiFillInstagram /></a>
            
           </div>
        </div>

    </footer>
  )
}
