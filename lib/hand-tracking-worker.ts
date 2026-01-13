// Web Worker for hand tracking calculations (can be moved to separate file)
export const handTrackingWorkerCode = `
  const handLandmarks = self.data || [];
  
  function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  
  function detectGesture(landmarks) {
    if (!landmarks || landmarks.length < 21) return "idle";
    
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const pinchDist = distance(thumbTip, indexTip);
    
    if (pinchDist < 0.05) return "pinch";
    return "idle";
  }
  
  self.onmessage = function(e) {
    const gesture = detectGesture(e.data);
    self.postMessage(gesture);
  };
`

// Create Web Worker for gesture detection to offload main thread
export function createGestureWorker() {
  const blob = new Blob([handTrackingWorkerCode], { type: "application/javascript" })
  const workerUrl = URL.createObjectURL(blob)
  return new Worker(workerUrl)
}