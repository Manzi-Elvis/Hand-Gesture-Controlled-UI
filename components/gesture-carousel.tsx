"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselItem {
  id: string
  title: string
  color: string
}

interface GestureCarouselProps {
  items: CarouselItem[]
  gestureDetected?: string
}

export function GestureCarousel({ items, gestureDetected }: GestureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (gestureDetected === "swipe_left") {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    } else if (gestureDetected === "swipe_right") {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    }
  }, [gestureDetected, items.length])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)

  const currentItem = items[currentIndex]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Main carousel item */}
        <div
          className={`h-64 rounded-xl glass p-6 flex items-center justify-center smooth-transition ${currentItem.color}`}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">{currentItem.title}</h2>
            <p className="text-sm text-muted-foreground">Swipe to navigate</p>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-2 glass rounded-lg hover:bg-primary/50 smooth-transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-2 glass rounded-lg hover:bg-primary/50 smooth-transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full smooth-transition ${
              index === currentIndex ? "bg-primary w-8" : "bg-muted w-2"
            }`}
          />
        ))}
      </div>
    </div>
  )
}