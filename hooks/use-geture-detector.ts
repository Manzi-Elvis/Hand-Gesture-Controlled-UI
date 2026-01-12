"use client"

import { useCallback, useRef } from "react"

export interface GestureDetectorOptions {
  onPinch?: () => void
  onOpenPalm?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onClosedFist?: () => void
  onGestureChange?: (gesture: string) => void
  onPositionChange?: (position: { x: number; y: number }) => void
  throttleMs?: number
}

export function useGestureDetector(options: GestureDetectorOptions) {
  const {
    onPinch,
    onOpenPalm,
    onSwipeLeft,
    onSwipeRight,
    onClosedFist,
    onGestureChange,
    onPositionChange,
    throttleMs = 16, // ~60fps
  } = options

  const lastGestureRef = useRef<string>("idle")
  const throttleRef = useRef<number>(0)

  const handleGesture = useCallback(
    (gesture: string, position?: { x: number; y: number }) => {
      const now = Date.now()
      if (now - throttleRef.current < throttleMs) return

      throttleRef.current = now

      if (gesture !== lastGestureRef.current) {
        lastGestureRef.current = gesture
        onGestureChange?.(gesture)
      }

      if (position) {
        onPositionChange?.(position)
      }

      switch (gesture) {
        case "pinch":
          onPinch?.()
          break
        case "open_palm":
          onOpenPalm?.()
          break
        case "swipe_left":
          onSwipeLeft?.()
          break
        case "swipe_right":
          onSwipeRight?.()
          break
        case "closed_fist":
          onClosedFist?.()
          break
      }
    },
    [onPinch, onOpenPalm, onSwipeLeft, onSwipeRight, onClosedFist, onGestureChange, onPositionChange, throttleMs],
  )

  return { handleGesture, lastGesture: lastGestureRef.current }
}