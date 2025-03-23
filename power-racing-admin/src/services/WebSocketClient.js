// File: src/services/WebSocketClient.js

/**
 * WebSocket client with robust error handling and reconnection logic
 */
class WebSocketClient {
    constructor(url, options = {}) {
      this.url = url;
      this.options = {
        reconnectInterval: 3000,
        maxReconnectAttempts: 5,
        ...options
      };
      this.socket = null;
      this.reconnectAttempts = 0;
      this.listeners = {
        message: [],
        open: [],
        close: [],
        error: []
      };
      this.isConnecting = false;
    }
  
    connect() {
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        console.log('WebSocket already connected or connecting');
        return;
      }
  
      if (this.isConnecting) {
        return;
      }
  
      this.isConnecting = true;
  
      try {
        this.socket = new WebSocket(this.url);
  
        this.socket.onopen = (event) => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          this.isConnecting = false;
          this.notifyListeners('open', event);
        };
  
        this.socket.onmessage = (event) => {
          this.notifyListeners('message', event);
        };
  
        this.socket.onclose = (event) => {
          this.isConnecting = false;
          this.notifyListeners('close', event);
          this.tryReconnect();
        };
  
        this.socket.onerror = (event) => {
          this.isConnecting = false;
          // Log the error but don't show an error to the user for network issues
          console.warn('WebSocket error:', event);
          this.notifyListeners('error', event);
        };
      } catch (error) {
        this.isConnecting = false;
        console.error('Failed to create WebSocket:', error);
      }
    }
  
    tryReconnect() {
      if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
        console.log(`Max reconnect attempts (${this.options.maxReconnectAttempts}) reached`);
        return;
      }
  
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.options.maxReconnectAttempts})...`);
  
      setTimeout(() => {
        this.connect();
      }, this.options.reconnectInterval);
    }
  
    send(data) {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        console.warn('Cannot send message, WebSocket is not open');
        return false;
      }
  
      try {
        this.socket.send(typeof data === 'string' ? data : JSON.stringify(data));
        return true;
      } catch (error) {
        console.error('Error sending WebSocket message:', error);
        return false;
      }
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  
    on(event, callback) {
      if (this.listeners[event]) {
        this.listeners[event].push(callback);
      }
      return this;
    }
  
    off(event, callback) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
      }
      return this;
    }
  
    notifyListeners(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error(`Error in WebSocket ${event} listener:`, error);
          }
        });
      }
    }
  }
  
  // File: src/services/socket.js
  // Example implementation using the WebSocketClient class
  
  import WebSocketClient from './WebSocketClient';
  
  let socket = null;
  
  export const initSocket = (url) => {
    if (socket) {
      socket.disconnect();
    }
  
    socket = new WebSocketClient(url, {
      reconnectInterval: 5000,
      maxReconnectAttempts: 10
    });
  
    // Add general event handlers
    socket.on('open', () => {
      console.log('Socket connection established');
    });
  
    socket.on('error', (error) => {
      // Handle error gracefully, avoid flooding the console
      console.warn('Socket connection error, will try to reconnect');
    });
  
    socket.on('close', () => {
      console.log('Socket connection closed');
    });
  
    socket.connect();
    return socket;
  };
  
  export const getSocket = () => {
    return socket;
  };
  
  export const closeSocket = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };
  
  // Use a more graceful approach to initialize the socket with connection failures
  export const initSocketWithFallback = (primaryUrl, fallbackUrl) => {
    try {
      // First try the primary URL
      const ws = initSocket(primaryUrl);
      
      // Set a timeout to check if connection was successful
      setTimeout(() => {
        if (!ws || !ws.socket || ws.socket.readyState !== WebSocket.OPEN) {
          console.log('Primary WebSocket connection failed, trying fallback');
          initSocket(fallbackUrl);
        }
      }, 3000);
      
      return ws;
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
      return null;
    }
  };