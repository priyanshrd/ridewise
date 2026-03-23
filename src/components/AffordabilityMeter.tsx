import React from 'react';
import { motion } from 'motion/react';

interface AffordabilityMeterProps {
  percentage: number;
  status: string;
  statusColor: string;
}

export const AffordabilityMeter: React.FC<AffordabilityMeterProps> = ({ percentage, status, statusColor }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const getMeterColor = () => {
    if (percentage < 15) return '#10b981'; // emerald-500
    if (percentage < 20) return '#3b82f6'; // blue-500
    if (percentage < 25) return '#f59e0b'; // amber-500
    return '#f43f5e'; // rose-500
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-10 bg-zinc-900 rounded-[40px] border border-zinc-800 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="relative w-56 h-56">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-zinc-800"
          />
          <motion.circle
            cx="112"
            cy="112"
            r={radius}
            stroke={getMeterColor()}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "circOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${getMeterColor()}44)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            key={percentage}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-black font-mono tracking-tighter"
          >
            {percentage.toFixed(1)}%
          </motion.span>
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-500 mt-1">Affordability</span>
        </div>
      </div>
      
      <div className="mt-8 text-center relative z-10">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-block px-4 py-1 rounded-full bg-opacity-10 border border-opacity-20 mb-3 ${statusColor} bg-current border-current`}
        >
          <span className="text-xs font-black uppercase tracking-widest">{status}</span>
        </motion.div>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-[240px]">
          {percentage < 15 ? "Optimized for your lifestyle. High financial freedom." : 
           percentage < 20 ? "Balanced choice. Requires standard budgeting." :
           percentage < 25 ? "Aggressive choice. May limit other lifestyle expenses." :
           "High risk. Significant impact on your monthly savings."}
        </p>
      </div>
    </div>
  );
};
