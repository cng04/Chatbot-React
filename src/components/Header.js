import React from 'react'
import '../css/Header.css';
import ontarioLogo from '../images/logo-ontario@2x.png'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// Component for the Ontario Header
export default function Header() {
  // useNavigate hook lets you navigate to the specified pages
  const navigate = useNavigate();

  const handleChatbotButton = (click) => {
    navigate("/");
  }

  const handleUploadButton = (click) => {
    navigate("/upload");
  } 


  return (
    <div className="header">
        <div className="ontario-logo">
          <img className="ontario-logo-image" src={ontarioLogo} alt="Government of Ontario Logo"/>
          <div className="header-button-container">
            <Button variant="contained" style={{marginLeft: 20}} className="header-button" onClick={handleChatbotButton}>Chatbot</Button>
            <Button variant="contained" style={{marginLeft: 20}} className="header-button" onClick={handleUploadButton}>Upload</Button>
          </div>
        </div>
    </div>
  )
}
