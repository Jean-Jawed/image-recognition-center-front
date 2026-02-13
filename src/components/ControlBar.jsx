import React from 'react';
import { Play, Square, Power } from 'lucide-react';

export function ControlBar({ 
  cameraActive, 
  wsConnected,
  onStart, 
  onStop 
}) {
  const isRunning = cameraActive && wsConnected;

  return (
    <div className="flex items-center justify-center gap-3 px-4 py-3 bg-irc-surface border-t border-irc-border">
      {!cameraActive ? (
        <button
          onClick={onStart}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg
                     bg-irc-accent/10 border border-irc-accent text-irc-accent
                     hover:bg-irc-accent/20 transition-all
                     font-mono text-sm uppercase tracking-wider"
        >
          <Play className="w-4 h-4" />
          Start
        </button>
      ) : (
        <button
          onClick={onStop}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg
                     bg-irc-danger/10 border border-irc-danger text-irc-danger
                     hover:bg-irc-danger/20 transition-all
                     font-mono text-sm uppercase tracking-wider"
        >
          <Power className="w-4 h-4" />
          Stop Flux
        </button>
      )}

      {/* Status text */}
      <span className="text-[10px] font-mono text-irc-text-muted uppercase ml-2">
        {isRunning ? 'System Active' : cameraActive ? 'Camera Only' : 'System Idle'}
      </span>
    </div>
  );
}
