import React from 'react'
import '../css/Header.css';
import ontarioLogo from '../images/logo-ontario@2x.png'

export default function Header() {
  return (
    <div className="header">
        <div className="ontario-logo">
          <img className="ontario-logo-image" src={ontarioLogo} alt="Government of Ontario Logo"/>
        </div>
    </div>
  )
}
