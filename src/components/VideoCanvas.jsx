import React, { useRef, useEffect, forwardRef } from 'react';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';

export const VideoCanvas = forwardRef(function VideoCanvas(
  { 
    processedFrame, 
    isActive, 
    hasMultipleCameras,
    onToggleFacing,
    error 
  }, 
  videoRef
) {
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  // Draw processed frame to canvas
  useEffect(() => {
    if (!processedFrame || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    img.onload = () => {
      // Match canvas size to image
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.drawImage(img, 0, 0);
    };

    img.src = `data:image/jpeg;base64,${processedFrame}`;
  }, [processedFrame]);

  return (
    <div className="monitor-frame flex-1 relative">
      {/* Scanline overlay for industrial look */}
      <div className="scanline" />
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-irc-border-active opacity-50" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-irc-border-active opacity-50" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-irc-border-active opacity-50" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-irc-border-active opacity-50" />

      {/* Video element (raw camera feed) */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${processedFrame ? 'hidden' : ''}`}
        playsInline
        muted
        autoPlay
      />

      {/* Canvas for processed frames */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover ${!processedFrame ? 'hidden' : ''}`}
      />

      {/* Idle state overlay */}
      {!isActive && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-irc-bg/90">
          <Camera className="w-12 h-12 text-irc-text-muted mb-3 opacity-30" />
          <span className="text-sm font-mono text-irc-text-muted uppercase tracking-wider">
            Camera Inactive
          </span>
          <span className="text-xs font-mono text-irc-text-muted/50 mt-1">
            Press START to begin
          </span>
        </div>
      )}

      {/* Error state overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-irc-bg/90">
          <CameraOff className="w-12 h-12 text-irc-danger mb-3 opacity-50" />
          <span className="text-sm font-mono text-irc-danger uppercase tracking-wider">
            Camera Error
          </span>
          <span className="text-xs font-mono text-irc-text-muted mt-1 max-w-[200px] text-center">
            {error}
          </span>
        </div>
      )}

      {/* Camera switch button (mobile) */}
      {isActive && hasMultipleCameras && (
        <button
          onClick={onToggleFacing}
          className="absolute top-3 right-3 p-2 rounded-lg bg-irc-bg/80 border border-irc-border
                     text-irc-text-muted hover:text-irc-text hover:bg-irc-surface transition-all"
          title="Switch camera"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      )}

      {/* REC indicator when processing */}
      {isActive && processedFrame && (
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded bg-irc-bg/80 border border-irc-border">
          <div className="w-2 h-2 rounded-full bg-irc-accent animate-pulse" />
          <span className="text-[10px] font-mono text-irc-accent uppercase">
            Processing
          </span>
        </div>
      )}
    </div>
  );
});
