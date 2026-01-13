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
  const [cameraActive, setCameraActive] = useState(false)
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

      console.log("[v0] Setting gesture:", gesture, "position:", position)

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
        isVisible={cursorVisible && cameraActive}
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

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero section */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Control with Your Hands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience a premium, gesture-controlled interface powered by advanced hand tracking. Move, pinch, and swipe
            to interact with UI elements.
          </p>
        </section>

        {/* Camera feed and controls */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Live Demo</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCameraActive(!cameraActive)}
                className="glass px-3 py-2 rounded-lg hover:bg-primary/20 smooth-transition flex items-center gap-2"
              >
                {cameraActive ? <Eye size={16} /> : <EyeOff size={16} />}
                <span className="text-sm">{cameraActive ? "Stop Camera" : "Start Camera"}</span>
              </button>
              <button
                onClick={() => setShowLandmarks(!showLandmarks)}
                className={`glass px-3 py-2 rounded-lg smooth-transition flex items-center gap-2 ${
                  showLandmarks ? "bg-primary/20" : "hover:bg-primary/20"
                }`}
              >
                <span className="text-sm">{showLandmarks ? "Hide" : "Show"} Landmarks</span>
              </button>
            </div>
          </div>
          <CameraFeed isActive={cameraActive} showLandmarks={showLandmarks} />
        </section>

        {/* Gesture guide */}
        <section>
          <GestureGuide />
        </section>

        {/* Interactive components */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold">Interactive Components</h3>

          {/* Carousel */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Gesture Carousel - Swipe to navigate</p>
            <GestureCarousel items={carouselItems} gestureDetected={gestureDetected} />
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Gesture Buttons - Pinch to activate</p>
            <div className="flex flex-wrap gap-4">
              <GestureButton
                label="Confirm"
                onClick={() => console.log("Confirmed")}
                isHovered={gestureDetected === "pinch"}
              />
              <GestureButton
                label="Select"
                onClick={() => console.log("Selected")}
                isHovered={gestureDetected === "pinch"}
              />
              <GestureButton
                label="Submit"
                onClick={() => console.log("Submitted")}
                isHovered={gestureDetected === "pinch"}
              />
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">Gesture Sliders - Move hand horizontally</p>
            <div className="glass rounded-xl p-6 space-y-6">
              <GestureSlider
                label="Sensitivity"
                value={sensitivity}
                onChange={setSensitivity}
                handPosition={handPosition}
                isActive={gestureDetected === "closed_fist"}
              />
              <GestureSlider
                label="Volume"
                value={volume}
                onChange={setVolume}
                handPosition={handPosition}
                isActive={gestureDetected === "closed_fist"}
              />
            </div>
          </div>
        </section>

        {/* Settings panel */}
        {settingsOpen && (
          <section className="glass rounded-xl p-6 space-y-4 smooth-transition">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings size={16} /> Settings
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded smooth-transition">
                <input
                  type="checkbox"
                  checked={cursorVisible}
                  onChange={(e) => setCursorVisible(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span className="text-sm">Show hand cursor</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded smooth-transition">
                <input
                  type="checkbox"
                  checked={showLandmarks}
                  onChange={(e) => setShowLandmarks(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span className="text-sm">Show hand landmarks</span>
              </label>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Gesture Detection: <span className="text-primary">{gestureDetected}</span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <section className="text-center py-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Built with MediaPipe Hands • Gesture-controlled UI • Premium Design • Optimized Performance
          </p>
        </section>
      </div>
    </main>
  )
}