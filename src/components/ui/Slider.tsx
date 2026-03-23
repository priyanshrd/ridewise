import React from 'react';
import { motion } from 'motion/react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  formatValue?: (val: number) => string;
  suffix?: string;
  prefix?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  suffix = '',
  prefix = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">{label}</label>
        <div className="flex items-center space-x-2 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 focus-within:border-blue-500 transition-colors">
          <span className="text-zinc-600 text-xs font-bold">{prefix}</span>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="bg-transparent text-right font-mono text-sm font-bold focus:outline-none w-24"
          />
          <span className="text-zinc-600 text-xs font-bold">{suffix}</span>
        </div>
      </div>
      <div className="relative h-8 flex items-center group">
        <div className="absolute w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
        />
        <motion.div 
          className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none transition-all duration-300 ease-out border-4 border-blue-600 flex items-center justify-center"
          style={{ left: `calc(${percentage}% - 12px)` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-1 h-1 bg-blue-600 rounded-full" />
        </motion.div>
      </div>
      <div className="flex justify-between text-[10px] text-zinc-600 font-black uppercase tracking-widest">
        <span>{prefix}{formatValue ? formatValue(min) : min}{suffix}</span>
        <span>{prefix}{formatValue ? formatValue(max) : max}{suffix}</span>
      </div>
    </div>
  );
};
