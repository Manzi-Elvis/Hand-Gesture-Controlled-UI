"use client"

import { useState, useEffect } from "react"

interface GestureButtonProps {
  label: string
  onClick: () => void
  isHovered: boolean
  gestureDetected?: string
}

export function GestureButton({ label, onClick, isHovered, gestureDetected }: GestureButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    if (gestureDetected === "pinch" && isHovered) {
      setIsPressed(true)
      const timer = setTimeout(() => {
        onClick()
        setIsPressed(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [gestureDetected, isHovered, onClick])

  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-lg font-medium smooth-transition ${
        isHovered || isPressed
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
          : "glass text-foreground hover:bg-white/10"
      } ${isPressed ? "scale-95" : ""}`}
    >
      {label}
      {isHovered && <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse pointer-events-none" />}
    </button>
  )
}