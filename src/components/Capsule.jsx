import React from 'react';

export function Capsule({ 
  id, 
  label, 
  description, 
  shortcut,
  isActive, 
  isConnected,
  onClick 
}) {
  return (
    <button
      onClick={onClick}
      className={`capsule-btn ${isActive ? 'active' : ''}`}
      title={description}
    >
      {/* Active indicator */}
      <div className="absolute top-2 right-2">
        <div 
          className={`status-dot ${isActive ? 'connected' : 'disconnected'}`}
        />
      </div>

      {/* Label */}
      <span className="text-[11px] leading-tight text-center">
        {label}
      </span>

      {/* Shortcut hint */}
      {shortcut && (
        <span className="text-[9px] text-irc-text-muted opacity-60">
          [{shortcut}]
        </span>
      )}
    </button>
  );
}
