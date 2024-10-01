import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
import Testimonials from '../../components/testimonials/Testimonials'
const Home = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Wellcome to our E-learning Platform</h1>
          <p>Learn,Grow,Excel</p>
          <button className='common-btn' onClick={()=>navigate("/courses")}>Get Started</button>
        </div>
      </div>
      <Testimonials/>
    </div>
  )
}

export default Home
