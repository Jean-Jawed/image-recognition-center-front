import React from 'react';

export function Footer() {
  return (
    <footer className="flex items-center justify-center px-4 py-3 border-t border-irc-border bg-irc-surface/30">
      <p className="text-[11px] font-mono text-irc-text-muted">
        Made for exhibition and education purpose. By{' '}
        <a 
          href="https://javed.fr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-irc-accent hover:text-irc-text transition-colors underline underline-offset-2"
        >
          Jawed Tahir
        </a>
      </p>
    </footer>
  );
}
