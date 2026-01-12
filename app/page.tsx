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
}