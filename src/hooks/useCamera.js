import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Camera hook for webcam capture
 */
export function useCamera() {
  const [isActive, setIsActive] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // 'user' = front, 'environment' = back
  const [error, setError] = useState(null);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  // Check for multiple cameras (mobile)
  useEffect(() => {
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      const videoInputs = devices.filter(d => d.kind === 'videoinput');
      setHasMultipleCameras(videoInputs.length > 1);
    }).catch(() => {});
  }, []);

  // Start camera
  const start = useCallback(async () => {
    try {
      setError(null);
      
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      streamRef.current = stream;
      setIsActive(true);
    } catch (e) {
      console.error('[Camera] Error:', e);
      setError(e.message || 'Camera access denied');
      setIsActive(false);
    }
  }, [facingMode]);

  // Stop camera
  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsActive(false);
  }, []);

  // Toggle camera (front/back)
  const toggleFacing = useCallback(async () => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    
    if (isActive) {
      stop();
      // Small delay for camera to release
      setTimeout(async () => {
        try {
          const constraints = {
            video: {
              facingMode: newMode,
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
          
          streamRef.current = stream;
          setIsActive(true);
        } catch (e) {
          setError(e.message);
        }
      }, 100);
    }
  }, [facingMode, isActive, stop]);

  // Capture current frame as base64
  const captureFrame = useCallback((quality = 0.8) => {
    if (!videoRef.current || !isActive) return null;
    
    const video = videoRef.current;
    
    // Create canvas if not exists
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Return base64 without data URL prefix
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    return dataUrl.split(',')[1];
  }, [isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    videoRef,
    isActive,
    facingMode,
    error,
    hasMultipleCameras,
    start,
    stop,
    toggleFacing,
    captureFrame,
  };
}
