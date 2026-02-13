import React from 'react';
import { Wifi, WifiOff, Activity } from 'lucide-react';

export function StatusBar({ 
  wsStatus, 
  currentMode, 
  fps, 
  cameraActive,
  facingMode 
}) {
  const getStatusColor = () => {
    switch (wsStatus) {
      case 'connected': return 'text-irc-accent';
      case 'connecting': return 'text-irc-warning';
      case 'error': return 'text-irc-danger';
      default: return 'text-irc-text-muted';
    }
  };

  const getStatusText = () => {
    switch (wsStatus) {
      case 'connected': return 'CONNECTED';
      case 'connecting': return 'CONNECTING...';
      case 'error': return 'ERROR';
      default: return 'STANDBY';
    }
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-irc-surface border-b border-irc-border">
      {/* Left: Connection status */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-1.5 ${getStatusColor()}`}>
          {wsStatus === 'connected' ? (
            <Wifi className="w-3.5 h-3.5" />
          ) : (
            <WifiOff className="w-3.5 h-3.5" />
          )}
          <span className="text-[10px] font-mono font-medium uppercase">
            {getStatusText()}
          </span>
        </div>

        {/* Current mode */}
        {currentMode && (
          <div className="flex items-center gap-1.5 text-irc-accent">
            <div className="w-1.5 h-1.5 rounded-full bg-irc-accent animate-pulse" />
            <span className="text-[10px] font-mono uppercase">
              {currentMode.replace('_', ' ')}
            </span>
          </div>
        )}
      </div>

      {/* Right: FPS and camera info */}
      <div className="flex items-center gap-3">
        {/* FPS counter */}
        {wsStatus === 'connected' && fps > 0 && (
          <div className="flex items-center gap-1.5 text-irc-text-muted">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono">
              <span className={fps < 10 ? 'text-irc-warning' : 'text-irc-accent'}>
                {fps.toFixed(1)}
              </span>
              {' '}FPS
            </span>
          </div>
        )}

        {/* Camera indicator */}
        {cameraActive && (
          <div className="flex items-center gap-1.5 text-irc-text-muted">
            <div className="w-2 h-2 rounded-full bg-irc-danger animate-pulse" />
            <span className="text-[10px] font-mono uppercase">
              {facingMode === 'user' ? 'FRONT' : 'REAR'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
