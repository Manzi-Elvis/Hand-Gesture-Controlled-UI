"use client"

import { useEffect, useRef } from "react"

interface Landmark {
  x: number
  y: number
  z: number
}

interface HandLandmarksProps {
  landmarks: Landmark[]
  isVisible: boolean
  width: number
  height: number
}

export function HandLandmarks({ landmarks, isVisible, width, height }: HandLandmarksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !isVisible || landmarks.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "rgba(8, 20, 40, 0.5)"
    ctx.fillRect(0, 0, width, height)

    // Draw connections
    const connections = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4], // Thumb
      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8], // Index
      [0, 9],
      [9, 10],
      [10, 11],
      [11, 12], // Middle
      [0, 13],
      [13, 14],
      [14, 15],
      [15, 16], // Ring
      [0, 17],
      [17, 18],
      [18, 19],
      [19, 20], // Pinky
      [5, 9],
      [9, 13],
      [13, 17], // Palm connections
    ]

    ctx.strokeStyle = "rgba(0, 217, 255, 0.4)"
    ctx.lineWidth = 2

    for (const [start, end] of connections) {
      const p1 = landmarks[start]
      const p2 = landmarks[end]
      if (p1 && p2) {
        ctx.beginPath()
        ctx.moveTo(p1.x * width, p1.y * height)
        ctx.lineTo(p2.x * width, p2.y * height)
        ctx.stroke()
      }
    }

    // Draw landmarks
    for (let i = 0; i < landmarks.length; i++) {
      const landmark = landmarks[i]
      const radius = i === 0 ? 6 : 4
      const color = i === 0 ? "rgba(255, 107, 157, 0.8)" : "rgba(0, 217, 255, 0.8)"

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(landmark.x * width, landmark.y * height, radius, 0, Math.PI * 2)
      ctx.fill()

      // Glow effect
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.3
      ctx.beginPath()
      ctx.arc(landmark.x * width, landmark.y * height, radius + 4, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1
    }
  }, [landmarks, isVisible, width, height])

  if (!isVisible) return null

  return <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0 rounded-lg" />
}
