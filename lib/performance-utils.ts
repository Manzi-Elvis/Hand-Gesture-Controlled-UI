// RequestAnimationFrame throttling for smooth 60fps performance
export function createRAFThrottler() {
  let lastFrameTime = 0
  let frameId: number | null = null

  return (callback: () => void, throttleMs = 16) => {
    if (frameId) {
      cancelAnimationFrame(frameId)
    }

    frameId = requestAnimationFrame((now) => {
      if (now - lastFrameTime >= throttleMs) {
        lastFrameTime = now
        callback()
        frameId = null
      } else {
        frameId = requestAnimationFrame(callback as FrameRequestCallback)
      }
    })
  }
}

// Debounce utility for gesture transitions
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Batch DOM updates to avoid layout thrashing
export function batchDOMUpdates(updates: () => void) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    requestIdleCallback(updates)
  } else {
    requestAnimationFrame(updates)
  }
}