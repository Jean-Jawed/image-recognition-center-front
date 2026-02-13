import { useState, useRef, useCallback, useEffect } from 'react';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/process';

/**
 * WebSocket hook for real-time video processing
 */
export function useWebSocket() {
  const [status, setStatus] = useState('disconnected'); // disconnected | connecting | connected | error
  const [currentMode, setCurrentMode] = useState(null);
  const [fps, setFps] = useState(0);
  const [error, setError] = useState(null);
  
  const wsRef = useRef(null);
  const onFrameRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setStatus('connecting');
    setError(null);

    try {
      const ws = new WebSocket(WS_URL);
      
      ws.onopen = () => {
        console.log('[WS] Connected');
        setStatus('connected');
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.error) {
            console.error('[WS] Server error:', data.error);
            setError(data.error);
            return;
          }

          if (data.status === 'mode_changed') {
            setCurrentMode(data.mode);
            return;
          }

          if (data.frame) {
            setFps(data.fps || 0);
            if (onFrameRef.current) {
              onFrameRef.current(data.frame);
            }
          }
        } catch (e) {
          console.error('[WS] Parse error:', e);
        }
      };

      ws.onerror = (e) => {
        console.error('[WS] Error:', e);
        setStatus('error');
        setError('Connection error');
      };

      ws.onclose = (e) => {
        console.log('[WS] Closed:', e.code, e.reason);
        setStatus('disconnected');
        setCurrentMode(null);
        setFps(0);
        wsRef.current = null;
      };

      wsRef.current = ws;
    } catch (e) {
      console.error('[WS] Connection failed:', e);
      setStatus('error');
      setError('Failed to connect');
    }
  }, []);

  // Disconnect
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setStatus('disconnected');
    setCurrentMode(null);
    setFps(0);
  }, []);

  // Set processing mode
  const setMode = useCallback((mode) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ mode }));
    }
  }, []);

  // Send frame for processing
  const sendFrame = useCallback((frameData) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ frame: frameData }));
    }
  }, []);

  // Set frame callback
  const onFrame = useCallback((callback) => {
    onFrameRef.current = callback;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    status,
    currentMode,
    fps,
    error,
    connect,
    disconnect,
    setMode,
    sendFrame,
    onFrame,
  };
}
