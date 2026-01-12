"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function useCamera(enabled: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!enabled) {
      // Cleanup stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      return
    }

    const initCamera = async () => {
      setIsLoading(true)
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
        }
        setError(null)
      } catch (err) {
        setError("Camera access denied. Please enable camera permissions.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    initCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [enabled])

  const toggleCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
    }
  }, [])

  return { videoRef, error, isLoading, toggleCamera }
}