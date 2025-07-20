"use client"
import React from 'react'
import PrimaryButton from "@/components/PrimaryButton";

export function ScrollToNewsletter() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('newsletter')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  return (
    <a href="#newsletter" onClick={handleClick}>
      <PrimaryButton>Get Notified</PrimaryButton>
    </a>
  )
}
