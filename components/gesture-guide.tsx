"use client"
import { Hand } from "lucide-react"

const gestures = [
  {
    name: "Pinch",
    icon: "✌️",
    description: "Touch thumb + index together",
    action: "Click / Select",
  },
  {
    name: "Open Palm",
    icon: "✋",
    description: "All fingers extended",
    action: "Idle / Pause",
  },
  {
    name: "Swipe Left",
    icon: "👆",
    description: "Move hand left quickly",
    action: "Navigate",
  },
  {
    name: "Swipe Right",
    icon: "👆",
    description: "Move hand right quickly",
    action: "Navigate",
  },
  {
    name: "Closed Fist",
    icon: "✊",
    description: "All fingers closed",
    action: "Drag / Hold",
  },
]

export function GestureGuide() {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Hand size={20} className="text-primary" />
        <h3 className="text-lg font-semibold">Gesture Guide</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {gestures.map((gesture) => (
          <div
            key={gesture.name}
            className="glass-dark rounded-lg p-3 text-center hover:bg-primary/10 smooth-transition"
          >
            <div className="text-2xl mb-2">{gesture.icon}</div>
            <h4 className="font-semibold text-sm mb-1">{gesture.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{gesture.description}</p>
            <p className="text-xs text-primary font-medium">{gesture.action}</p>
          </div>
        ))}
      </div>
    </div>
  )
}