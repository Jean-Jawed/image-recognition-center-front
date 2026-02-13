import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StatusBar } from './components/StatusBar';
import { VideoCanvas } from './components/VideoCanvas';
import { CapsuleGrid } from './components/CapsuleGrid';
import { ControlBar } from './components/ControlBar';
import { useWebSocket } from './hooks/useWebSocket';
import { useCamera } from './hooks/useCamera';

// Frame capture interval (ms) — ~15 FPS to backend
const CAPTURE_INTERVAL = 66;

function App() {
  const [processedFrame, setProcessedFrame] = useState(null);
  const captureIntervalRef = useRef(null);

  // Hooks
  const camera = useCamera();
  const ws = useWebSocket();

  // Handle incoming processed frames
  useEffect(() => {
    ws.onFrame((frame) => {
      setProcessedFrame(frame);
    });
  }, [ws]);

  // Start capturing and sending frames
  const startCapture = useCallback(() => {
    if (captureIntervalRef.current) return;

    captureIntervalRef.current = setInterval(() => {
      if (camera.isActive && ws.status === 'connected') {
        const frame = camera.captureFrame(0.7); // 70% quality JPEG
        if (frame) {
          ws.sendFrame(frame);
        }
      }
    }, CAPTURE_INTERVAL);
  }, [camera, ws]);

  // Stop capturing
  const stopCapture = useCallback(() => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
    setProcessedFrame(null);
  }, []);

  // Start everything
  const handleStart = useCallback(async () => {
    await camera.start();
    ws.connect();
  }, [camera, ws]);

  // Stop everything
  const handleStop = useCallback(() => {
    stopCapture();
    ws.disconnect();
    camera.stop();
    setProcessedFrame(null);
  }, [stopCapture, ws, camera]);

  // Handle mode selection
  const handleSelectMode = useCallback((mode) => {
    ws.setMode(mode);
    
    // If selecting a mode and not yet capturing, start
    if (mode && !captureIntervalRef.current && camera.isActive) {
      startCapture();
    }
    
    // If deselecting (mode = null), stop capture but keep camera
    if (!mode) {
      stopCapture();
    }
  }, [ws, camera.isActive, startCapture, stopCapture]);

  // Start capture when both camera and WS are ready
  useEffect(() => {
    if (camera.isActive && ws.status === 'connected' && ws.currentMode) {
      startCapture();
    }
  }, [camera.isActive, ws.status, ws.currentMode, startCapture]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCapture();
    };
  }, [stopCapture]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Number keys 1-5 for capsules
      if (e.key >= '1' && e.key <= '5' && !e.ctrlKey && !e.metaKey) {
        const capsuleIndex = parseInt(e.key) - 1;
        const capsules = ['hand_tracking', 'pose_detection', 'face_mesh', 'emotion_detection', 'object_detection'];
        if (capsules[capsuleIndex]) {
          handleSelectMode(
            ws.currentMode === capsules[capsuleIndex] ? null : capsules[capsuleIndex]
          );
        }
      }
      
      // Space to start/stop
      if (e.key === ' ' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        if (camera.isActive) {
          handleStop();
        } else {
          handleStart();
        }
      }
      
      // Escape to stop
      if (e.key === 'Escape') {
        handleStop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera.isActive, ws.currentMode, handleStart, handleStop, handleSelectMode]);

  return (
    <div className="h-full flex flex-col bg-irc-bg">
      <Header />
      
      <StatusBar
        wsStatus={ws.status}
        currentMode={ws.currentMode}
        fps={ws.fps}
        cameraActive={camera.isActive}
        facingMode={camera.facingMode}
      />

      <main className="flex-1 flex flex-col min-h-0 p-3 gap-3">
        <VideoCanvas
          ref={camera.videoRef}
          processedFrame={processedFrame}
          isActive={camera.isActive}
          hasMultipleCameras={camera.hasMultipleCameras}
          onToggleFacing={camera.toggleFacing}
          error={camera.error}
        />

        <CapsuleGrid
          currentMode={ws.currentMode}
          isConnected={ws.status === 'connected'}
          onSelectMode={handleSelectMode}
        />
      </main>

      <ControlBar
        cameraActive={camera.isActive}
        wsConnected={ws.status === 'connected'}
        onStart={handleStart}
        onStop={handleStop}
      />

      <Footer />
    </div>
  );
}

export default App;
