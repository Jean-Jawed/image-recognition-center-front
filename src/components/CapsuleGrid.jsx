import React from 'react';
import { Capsule } from './Capsule';
import { CAPSULES } from '../config/capsules';

export function CapsuleGrid({ 
  currentMode, 
  isConnected, 
  onSelectMode,
  layout = "default"
}) {
  const handleClick = (capsuleId) => {
    // Toggle: if clicking active capsule, deactivate it
    if (currentMode === capsuleId) {
      onSelectMode(null);
    } else {
      onSelectMode(capsuleId);
    }
  };

  return (
    <div 
      className={`
        bg-irc-surface/50 border border-irc-border rounded-lg p-3
        ${layout === "responsive" 
          ? "grid grid-cols-5 md:grid-cols-1 gap-2" 
          : "grid grid-cols-5 gap-2"
        }
      `}
    >
      {/* Section title - visible on desktop only */}
      {layout === "responsive" && (
        <div className="hidden md:block col-span-1 mb-1">
          <span className="text-[10px] font-mono text-irc-text-muted uppercase tracking-wider">
            Processors
          </span>
        </div>
      )}
      
      {CAPSULES.map((capsule) => (
        <Capsule
          key={capsule.id}
          {...capsule}
          isActive={currentMode === capsule.id}
          isConnected={isConnected}
          onClick={() => handleClick(capsule.id)}
          layout={layout}
        />
      ))}
    </div>
  );
}
