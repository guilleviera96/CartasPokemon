import React from 'react';
import './Button.css';

export default function Button({ text, colorClass = 'base', onClick, disabled = false }) {
  return (
    <button
      className={`buttonStyle ${colorClass} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
