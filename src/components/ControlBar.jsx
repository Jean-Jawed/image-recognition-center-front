import React from 'react';
import { Play, Power } from 'lucide-react';

export function ControlBar({ 
  cameraActive, 
  wsConnected,
  onStart, 
  onStop,
  layout = "default"
}) {
  const isRunning = cameraActive && wsConnected;
  const isResponsive = layout === "responsive";

  return (
    <div 
      className={`
        bg-irc-surface/50 border border-irc-border rounded-lg
        ${isResponsive 
          ? 'flex flex-row md:flex-col items-center justify-center gap-3 p-3' 
          : 'flex items-center justify-center gap-3 px-4 py-3'
        }
      `}
    >
      {!cameraActive ? (
        <button
          onClick={onStart}
          className={`
            flex items-center justify-center gap-2 rounded-lg
            bg-irc-accent/10 border border-irc-accent text-irc-accent
            hover:bg-irc-accent/20 transition-all
            font-mono text-sm uppercase tracking-wider
            ${isResponsive 
              ? 'flex-1 md:flex-none md:w-full px-4 py-2.5' 
              : 'px-6 py-2.5'
            }
          `}
        >
          <Play className="w-4 h-4" />
          <span>Start</span>
        </button>
      ) : (
        <button
          onClick={onStop}
          className={`
            flex items-center justify-center gap-2 rounded-lg
            bg-irc-danger/10 border border-irc-danger text-irc-danger
            hover:bg-irc-danger/20 transition-all
            font-mono text-sm uppercase tracking-wider
            ${isResponsive 
              ? 'flex-1 md:flex-none md:w-full px-4 py-2.5' 
              : 'px-6 py-2.5'
            }
          `}
        >
          <Power className="w-4 h-4" />
          <span>Stop</span>
        </button>
      )}

      {/* Status text */}
      <span 
        className={`
          text-[10px] font-mono text-irc-text-muted uppercase
          ${isResponsive ? 'md:text-center md:pt-1 md:border-t md:border-irc-border md:w-full' : 'ml-2'}
        `}
      >
        {isRunning ? 'System Active' : cameraActive ? 'Camera Only' : 'System Idle'}
      </span>
    </div>
  );
}
