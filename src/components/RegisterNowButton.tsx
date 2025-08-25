"use client"
import React from 'react'
import PrimaryButton from './PrimaryButton'

export function RegisterNowButton() {
  const handleClick = () => {
    // Commented out the original Google Form event registration
    // window.open('https://forms.gle/FORM_ID', '_blank', 'noopener,noreferrer')
    
    // Now redirects to student registration form instead
    window.location.href = '/student-form'
  }

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
      <PrimaryButton className="hover:scale-105 transition-transform duration-200">
        Register Now
      </PrimaryButton>
    </div>
  )
}

export default RegisterNowButton;
