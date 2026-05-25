import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import '../styles/toast.css';

export default function Toast({ message, type = 'info', onClose, duration = 3500 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger CSS transition on mount
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast-container toast-${type} ${isVisible ? 'toast-show' : 'toast-hide'}`}>
      {type === 'success' && <CheckCircle size={18} />}
      {(type === 'error' || type === 'danger') && <AlertCircle size={18} />}
      {type === 'info' && <Info size={18} />}
      <span>{message}</span>
    </div>
  );
}
