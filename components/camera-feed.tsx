"use client"

import { useRef, useEffect, useState } from "react"
import { HandLandmarks } from "./hand-landmarks"

interface CameraFeedProps {
  isActive: boolean
  onFrame?: (landmarks: any[]) => void
  showLandmarks: boolean
}

export function CameraFeed({ isActive, onFrame, showLandmarks }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [landmarks, setLandmarks] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isActive) return

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        setError("Camera access denied. Please enable camera permissions.")
      }
    }

    initCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isActive])

  // Simulate hand tracking (in production, use MediaPipe)
  useEffect(() => {
    if (!videoRef.current || !isActive) return

    const animate = () => {
      const video = videoRef.current
      if (!video) return

      // Generate mock landmarks for demo
      const mockLandmarks = Array.from({ length: 21 }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: 0,
      }))

      setLandmarks(mockLandmarks)
      onFrame?.(mockLandmarks)

      requestAnimationFrame(animate)
    }

    animate()
  }, [isActive, onFrame])

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden glass">
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-red-400 font-medium">{error}</p>
            <p className="text-xs text-muted-foreground mt-2">Try refreshing the page</p>
          </div>
        </div>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" muted />
          <HandLandmarks landmarks={landmarks} isVisible={showLandmarks && isActive} width={640} height={480} />
        </>
      )}

      {/* Camera status indicator */}
      {isActive && (
        <div className="absolute top-4 left-4 flex items-center gap-2 glass-dark px-3 py-2 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium">Live</span>
        </div>
      )}
    </div>
  )
}