import React from 'react';
import { ShapeType } from '../types/game';

interface ShapeIconProps {
  shape: ShapeType;
  className?: string;
}

export const ShapeIcon: React.FC<ShapeIconProps> = ({ shape, className = 'w-6 h-6' }) => {
  switch (shape) {
    case 'triangle':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 3L2 21H22L12 3Z" />
        </svg>
      );
    case 'diamond':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2L22 12L12 22L2 12L12 2Z" />
        </svg>
      );
    case 'circle':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case 'square':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      );
    default:
      return null;
  }
};
