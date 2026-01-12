"use client"

import { memo, useMemo } from "react"

interface OptimizedHandCursorProps {
  x: number
  y: number
  gesture: string
  isVisible: boolean
}

const HandCursorContent = memo(
  ({ x, y, gesture, isVisible, size, color }: OptimizedHandCursorProps & { size: number; color: string }) => {
    console.log("Cursor state:", { x, y, gesture, isVisible, size })

    if (!isVisible) {
      console.log("Cursor not visible")
      return null
    }

    return (
      <div
        className="fixed pointer-events-none z-50 smooth-transition"
        style={{
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        {/* Outer ring - more visible */}
        <div
          className="absolute border-2 rounded-full smooth-transition"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderColor: color,
            left: `-${size / 2}px`,
            top: `-${size / 2}px`,
            opacity: 1,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
        {/* Center dot - bright and visible */}
        <div
          className="absolute rounded-full smooth-transition"
          style={{
            width: `${size / 2}px`,
            height: `${size / 2}px`,
            backgroundColor: color,
            left: `-${size / 4}px`,
            top: `-${size / 4}px`,
            opacity: 1,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
        {/* Gesture indicator */}
        {gesture !== "idle" && (
          <div
            className="absolute text-xs font-medium text-accent rounded-full px-2 py-1 glass smooth-transition"
            style={{
              top: `${size / 2 + 8}px`,
              left: `-30px`,
              whiteSpace: "nowrap",
              fontSize: "11px",
            }}
          >
            {gesture.replace(/_/g, " ")}
          </div>
        )}
      </div>
    )
  },
)

HandCursorContent.displayName = "HandCursorContent"

export const OptimizedHandCursor = memo(function OptimizedHandCursor({
  x,
  y,
  gesture,
  isVisible,
}: OptimizedHandCursorProps) {
  const { size, color } = useMemo(() => {
    return {
      size: gesture === "pinch" ? 20 : gesture === "closed_fist" ? 28 : 24,
      color: gesture === "pinch" ? "#00d9ff" : gesture === "closed_fist" ? "#ff6b9d" : "#00d9ff",
    }
  }, [gesture])

  return <HandCursorContent x={x} y={y} gesture={gesture} isVisible={isVisible} size={size} color={color} />
})