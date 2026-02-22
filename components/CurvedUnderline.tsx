'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

interface CurvedUnderlineProps {
  width?: number | string;
  height?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

const CurvedUnderline: React.FC<CurvedUnderlineProps> = ({
  width = 120,
  height = 12,
  color,
  className = '',
  animate = true,
}) => {
  const { currentTheme } = useTheme();
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const strokeColor = color || currentTheme.colors.secondary;

  useEffect(() => {
    if (animate && pathRef.current && svgRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, [animate, strokeColor]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 120 12"
      fill="none"
      className={`block ${className}`}
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M2 10C20 2 40 2 60 6C80 10 100 10 118 2"
        stroke={strokeColor}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default CurvedUnderline;
