"use client"
import React from 'react'
import PrimaryButton from './PrimaryButton'

interface RegisterNowButtonProps {
  eventId: string;
}

export function RegisterNowButton({ eventId }: RegisterNowButtonProps) {
  const handleClick = () => {
    if (!eventId) return;
    // Redirect to dynamic event page
    window.location.href = `/events/${eventId}`;
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
      <PrimaryButton className="hover:scale-105 transition-transform duration-200">
        Register Now
      </PrimaryButton>
    </div>
  );
}

export default RegisterNowButton;
