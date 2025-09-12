// Metric Card - Pour dashboard cardio moderne
'use client';

import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  color?: 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'indigo';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  onClick?: () => void;
}

export default function MetricCard({
  title,
  value,
  unit,
  icon,
  trend,
  color = 'blue',
  size = 'md',
  animated = true,
  onClick
}: MetricCardProps) {
  const colorVariants = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-600',
      icon: 'text-blue-500'
    },
    green: {
      gradient: 'from-green-500 to-emerald-600', 
      bg: 'from-green-50 to-emerald-100',
      border: 'border-green-200',
      text: 'text-green-600',
      icon: 'text-green-500'
    },
    red: {
      gradient: 'from-red-500 to-red-600',
      bg: 'from-red-50 to-red-100', 
      border: 'border-red-200',
      text: 'text-red-600',
      icon: 'text-red-500'
    },
    orange: {
      gradient: 'from-orange-500 to-orange-600',
      bg: 'from-orange-50 to-orange-100',
      border: 'border-orange-200', 
      text: 'text-orange-600',
      icon: 'text-orange-500'
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      bg: 'from-purple-50 to-purple-100',
      border: 'border-purple-200',
      text: 'text-purple-600', 
      icon: 'text-purple-500'
    },
    indigo: {
      gradient: 'from-indigo-500 to-indigo-600',
      bg: 'from-indigo-50 to-indigo-100',
      border: 'border-indigo-200',
      text: 'text-indigo-600',
      icon: 'text-indigo-500'
    }
  };

  const sizeVariants = {
    sm: {
      card: 'p-4',
      title: 'text-xs',
      value: 'text-lg',
      icon: 'w-4 h-4'
    },
    md: {
      card: 'p-6',
      title: 'text-sm',
      value: 'text-2xl',
      icon: 'w-5 h-5'
    },
    lg: {
      card: 'p-8', 
      title: 'text-base',
      value: 'text-3xl',
      icon: 'w-6 h-6'
    }
  };

  const colors = colorVariants[color];
  const sizes = sizeVariants[size];

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${colors.bg}
        border ${colors.border}
        shadow-lg hover:shadow-xl
        ${sizes.card}
        ${animated ? 'transform transition-all duration-300 hover:scale-105 hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        group
      `}
      onClick={onClick}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated glow effect */}
      {animated && (
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon and title */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {icon && (
              <div className={`${colors.icon} ${sizes.icon} ${animated ? 'transform group-hover:scale-110 transition-transform duration-300' : ''}`}>
                {icon}
              </div>
            )}
            <h3 className={`font-medium ${colors.text} ${sizes.title}`}>
              {title}
            </h3>
          </div>
          
          {/* Trend indicator */}
          {trend && (
            <div className={`flex items-center space-x-1 text-xs ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="flex items-baseline space-x-1">
          <span className={`font-bold text-gray-800 ${sizes.value} ${animated ? 'transform group-hover:scale-105 transition-transform duration-300' : ''}`}>
            {value}
          </span>
          {unit && (
            <span className="text-gray-500 text-sm font-medium">
              {unit}
            </span>
          )}
        </div>
        
        {/* Trend label */}
        {trend?.label && (
          <p className="text-xs text-gray-500 mt-1">
            {trend.label}
          </p>
        )}
      </div>
      
      {/* Shimmer effect on hover */}
      {animated && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      )}
    </div>
  );
}