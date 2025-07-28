"use client"
import React from 'react'
import PrimaryButton from './PrimaryButton'

export function RegisterNowButton() {
  const handleClick = () => {
    
    window.open('https://forms.gle/FORM_ID', '_blank', 'noopener,noreferrer')
  }

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
      <PrimaryButton>Register Now</PrimaryButton>
    </div>
  )
}

export default RegisterNowButton;
