"use client"

import { useEffect } from "react"

interface GestureSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  handPosition?: { x: number; y: number }
  isActive: boolean
}

export function GestureSlider({ label, value, onChange, handPosition, isActive }: GestureSliderProps) {
  useEffect(() => {
    if (isActive && handPosition) {
      // Use hand X position to control slider (0-1 maps to 0-100)
      const newValue = Math.round(handPosition.x * 100)
      onChange(newValue)
    }
  }, [handPosition, isActive, onChange])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium">{label}</label>
        <span className={`text-lg font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>{value}%</span>
      </div>
      <div className={`relative h-2 rounded-full smooth-transition ${isActive ? "bg-primary/30" : "bg-muted"}`}>
        <div className="absolute h-full rounded-full bg-primary smooth-transition" style={{ width: `${value}%` }} />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/30 smooth-transition ${
            isActive ? "scale-125" : "scale-100"
          }`}
          style={{ left: `${value}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  )
}