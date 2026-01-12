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
}