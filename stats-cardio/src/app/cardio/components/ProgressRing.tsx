// Composant Progress Ring - Pour dashboard cardio moderne
'use client';

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  label?: string;
  animate?: boolean;
}

export default function ProgressRing({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = "rgb(59, 130, 246)", // blue-500
  backgroundColor = "rgb(229, 231, 235)", // gray-200
  showPercentage = true,
  label,
  animate = true
}: ProgressRingProps) {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / max) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className={`transform -rotate-90 ${animate ? 'transition-all duration-1000 ease-out' : ''}`}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: animate ? strokeDashoffset : circumference,
            transition: animate ? 'stroke-dashoffset 1.5s ease-out' : 'none'
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <span className="text-2xl font-bold text-gray-800">
            {Math.round(percentage)}%
          </span>
        )}
        {label && (
          <span className="text-xs text-gray-500 text-center max-w-[80px] leading-tight">
            {label}
          </span>
        )}
      </div>

    </div>
  );
}