import React from 'react';

export function Capsule({ 
  id, 
  label, 
  description, 
  shortcut,
  isActive, 
  isConnected,
  onClick,
  layout = "default"
}) {
  // Desktop responsive: horizontal button with full label
  // Mobile: compact square button
  const isResponsive = layout === "responsive";

  return (
    <button
      onClick={onClick}
      className={`
        capsule-btn relative
        ${isActive ? 'active' : ''}
        ${isResponsive 
          ? 'md:flex md:flex-row md:items-center md:justify-start md:gap-3 md:px-3 md:py-2.5 md:h-auto' 
          : ''
        }
      `}
      title={description}
    >
      {/* Active indicator */}
      <div className={`
        absolute top-2 right-2
        ${isResponsive ? 'md:relative md:top-0 md:right-0 md:order-3 md:ml-auto' : ''}
      `}>
        <div 
          className={`status-dot ${isActive ? 'connected' : 'disconnected'}`}
        />
      </div>

      {/* Label */}
      <span className={`
        text-[11px] leading-tight text-center
        ${isResponsive ? 'md:text-left md:text-xs md:font-medium' : ''}
      `}>
        {label}
      </span>

      {/* Shortcut hint */}
      {shortcut && (
        <span className={`
          text-[9px] text-irc-text-muted opacity-60
          ${isResponsive ? 'md:hidden' : ''}
        `}>
          [{shortcut}]
        </span>
      )}

      {/* Desktop shortcut - shown inline */}
      {shortcut && isResponsive && (
        <span className="hidden md:inline text-[10px] text-irc-text-muted opacity-50 font-mono">
          {shortcut}
        </span>
      )}
    </button>
  );
}
