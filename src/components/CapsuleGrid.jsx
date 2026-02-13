import React from 'react';
import { Capsule } from './Capsule';
import { CAPSULES } from '../config/capsules';

export function CapsuleGrid({ 
  currentMode, 
  isConnected, 
  onSelectMode 
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
    <div className="grid grid-cols-5 gap-2 p-3 bg-irc-surface/50 border-t border-irc-border">
      {CAPSULES.map((capsule) => (
        <Capsule
          key={capsule.id}
          {...capsule}
          isActive={currentMode === capsule.id}
          isConnected={isConnected}
          onClick={() => handleClick(capsule.id)}
        />
      ))}
    </div>
  );
}
