
import React from 'react';
import { PetMood } from '../types';

interface PetAvatarProps {
  mood: PetMood;
  color: string;
  size?: number;
}

const PetAvatar: React.FC<PetAvatarProps> = ({ mood, color, size = 150 }) => {
  const renderFace = () => {
    switch (mood) {
      case 'HAPPY':
        return (
          <g>
            <path d="M40 55 Q50 65 60 55" stroke="black" strokeWidth="3" fill="none" />
            <circle cx="35" cy="45" r="3" fill="black" />
            <circle cx="65" cy="45" r="3" fill="black" />
            <path d="M30 40 Q35 35 40 40" stroke="black" strokeWidth="1.5" fill="none" />
            <path d="M60 40 Q65 35 70 40" stroke="black" strokeWidth="1.5" fill="none" />
          </g>
        );
      case 'THINKING':
        return (
          <g>
            <circle cx="35" cy="45" r="3" fill="black" />
            <circle cx="65" cy="45" r="3" fill="black" />
            <path d="M45 60 H55" stroke="black" strokeWidth="3" />
            <circle cx="75" cy="30" r="4" fill="white" stroke="black" />
            <circle cx="82" cy="22" r="2" fill="white" stroke="black" />
          </g>
        );
      case 'SLEEPY':
        return (
          <g>
            <path d="M30 45 H40" stroke="black" strokeWidth="3" />
            <path d="M60 45 H70" stroke="black" strokeWidth="3" />
            <path d="M45 55 Q50 60 55 55" stroke="black" strokeWidth="2" fill="none" />
            <text x="75" y="35" fontSize="12" className="animate-pulse">Zzz</text>
          </g>
        );
      case 'SURPRISED':
        return (
          <g>
            <circle cx="35" cy="45" r="4" fill="black" />
            <circle cx="65" cy="45" r="4" fill="black" />
            <circle cx="50" cy="60" r="5" stroke="black" fill="none" />
          </g>
        );
      default: // IDLE
        return (
          <g>
            <circle cx="35" cy="45" r="3" fill="black" />
            <circle cx="65" cy="45" r="3" fill="black" />
            <path d="M45 58 Q50 63 55 58" stroke="black" strokeWidth="2" fill="none" />
          </g>
        );
    }
  };

  return (
    <div className="relative animate-float cursor-pointer select-none">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {/* Shadow */}
        <ellipse cx="50" cy="90" rx="30" ry="5" fill="black" opacity="0.1" />
        
        {/* Body */}
        <path 
          d="M20 80 Q10 80 10 60 Q10 20 50 20 Q90 20 90 60 Q90 80 80 80 L20 80" 
          fill={color} 
          stroke="rgba(0,0,0,0.1)" 
          strokeWidth="2"
        />
        
        {/* Cheeks */}
        <circle cx="25" cy="55" r="5" fill="#ffacc5" opacity="0.4" />
        <circle cx="75" cy="55" r="5" fill="#ffacc5" opacity="0.4" />
        
        {/* Face */}
        {renderFace()}
        
        {/* Accessories - small blush or dots */}
        <circle cx="15" cy="40" r="1.5" fill="white" opacity="0.6" />
      </svg>
    </div>
  );
};

export default PetAvatar;
