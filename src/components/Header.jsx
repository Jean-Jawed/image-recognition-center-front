import React from 'react';

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-irc-border bg-irc-surface/50">
      <div className="flex items-center gap-3">
        {/* Logo placeholder - replace with your logo.png */}
        <div className="w-9 h-9 rounded bg-irc-surface-alt border border-irc-border flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="IRC" 
            className="w-7 h-7 object-contain"
            onError={(e) => {
              // Fallback if logo not loaded
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="text-irc-accent font-mono font-bold text-sm">IRC</span>';
            }}
          />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-irc-text tracking-tight">
            Image Recognition Center
          </h1>
          <span className="text-[10px] font-mono text-irc-text-muted uppercase tracking-widest">
            Real-time Vision Processing
          </span>
        </div>
      </div>

      {/* Status indicator area - can be extended */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-irc-text-muted uppercase">
          v1.0
        </span>
      </div>
    </header>
  );
}
