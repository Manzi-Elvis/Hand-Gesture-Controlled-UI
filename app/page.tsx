"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { CameraFeed } from "@/components/camera-feed"
import { GestureGuide } from "@/components/gesture-guide"
import { GestureButton } from "@/components/gesture-button"
import { GestureCarousel } from "@/components/gesture-carousel"
import { GestureSlider } from "@/components/gesture-slider"
import { OptimizedHandCursor } from "@/components/optimized-hand-cursor"
import { useGestureDetector } from "@/hooks/use-gesture-detector"
import { useCamera } from "@/hooks/use-camera"
import { createRAFThrottler } from "@/lib/performance-utils"
import { Eye, EyeOff, Volume2, Settings, Zap } from "lucide-react"

export default function Page() {
      const [camerActive, setCameraActive] = useState(false)
      const [showLandmarks, setShowLandmarks] = useState(false)
      const [gestureDetected, setGestureDetected] = useState("idle")
      const [handPosition, setHandPosition] = useState({ x: 0.5, y: 0.5 })
      const [sensitivity, setSensitivity] = useState(50)
      const [volume, setVolume] = useState(70)
      const [settingsOpen, setSettingsOpen] = useState(false)
      const [cursorVisible, setCursorVisible] = useState(true)
      const rafThrottler = useRef(createRAFThrottler())

      const { videoRef } = useCamera(cameraActive)

      const { handleGesture } = useGestureDetector({
            onGestureChange: setGestureDetected,
            onPositionChange: setHandPosition,
            throttleMs: 16, // 60fps
      })
      // Simulate gesture detection with throttling
      useEffect(() => {
            if (!cameraActive) return

            const interval = setInterval(() => {
                  const gestures = ["pinch", "open_palm", "swipe_left", "swipe_right", "closed_fist", "idle"]
                  const gesture = gestures[Math.floor(Math.random() * gestures.length)]
                  const position = {
                        x: Math.random() * 0.6 + 0.2, // Keep between 20-80% horizontally
                        y: Math.random() * 0.4 + 0.3, // Keep between 30-70% vertically
                  }

                 console.log("Setting gesture:", gesture, "position:", position)

                 // Use throttler for performance
                 rafThrottler.current(() => {
                  handleGesture(gesture, position)
                  setHandPosition(position)
                 })
            }, 500)

            return () => clearInterval(interval)
      }, [cameraActive, handleGesture])

      const carouselItems = [
            { id: "1", title: "Visual Pro", color: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" },
            { id: "2", title: "Gesture Control", color: "bg-gradient-to-br from-purple-500/20 to-pink-500/20" },
            { id: "3", title: "Premium Design", color: "bg-gradient-to-br from-orange-500/20 to-red-500/20" },
      ]
      const handleSettingsToggle = useCallback(() => {
            setSettingsOpen((prev) => !prev)
      }, [])
      return (
            <main className={`min-h-screen bg-background text-foreground ${cursorVisible ? "hand-cursor" : ""}`}>
                  {/* Optimized hand cursor with memoization */}
                  <OptimizedHandCursor
                        x={handPosition.x}
                        y={handPosition.y}
                        gesture={gestureDetected}
                        isVisible={cursorVisible && camerActive}
                  />
                  {/* Header with sticky positioning */}
                  <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-primary" />
              <h1 className="text-2xl font-bold">Hand Gesture UI</h1>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Premium gesture-controlled interface</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCameraActive(!cameraActive)}
              className="glass px-3 py-2 rounded-lg hover:bg-primary/20 smooth-transition flex items-center gap-2"
            >
              <Volume2 size={16} />
              <span className="text-sm">{volume}%</span>
            </button>
            <button
              onClick={handleSettingsToggle}
              className="glass px-3 py-2 rounded-lg hover:bg-primary/20 smooth-transition"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>
            </main>
      )

}