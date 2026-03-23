import React from 'react';
import { motion } from 'motion/react';
import { X, Download, Copy, Check } from 'lucide-react';
import { CalculatorResults } from '../hooks/useCalculator';
import { BikePreset } from '../data/bikes';

interface ShareSnapshotProps {
  bike: BikePreset;
  results: CalculatorResults;
  onClose: () => void;
}

export const ShareSnapshot: React.FC<ShareSnapshotProps> = ({ bike, results, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-zinc-950/90 backdrop-blur-sm"
    >
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white text-zinc-950 rounded-3xl overflow-hidden shadow-2xl p-8 space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">RideWise</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">Financial Snapshot</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              results.affordabilityPercentage < 15 ? 'bg-emerald-100 text-emerald-700' :
              results.affordabilityPercentage < 20 ? 'bg-blue-100 text-blue-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              {results.status}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Selected Machine</p>
            <h3 className="text-3xl font-bold tracking-tight">{bike.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Monthly Cost</p>
              <p className="text-2xl font-mono font-bold">₹{Math.round(results.totalMonthlyCost).toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Affordability</p>
              <p className="text-2xl font-mono font-bold">{results.affordabilityPercentage.toFixed(1)}%</p>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Ex-Showroom Price</span>
              <span className="font-mono font-bold">₹{Math.round(bike.price).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">GST ({results.gstRate}%)</span>
              <span className="font-mono font-bold text-rose-600">+₹{Math.round(results.gstAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Accessories & Gear</span>
              <span className="font-mono font-bold text-rose-600">+₹{Math.round(results.accessoriesCost).toLocaleString()}</span>
            </div>
            <div className="h-px bg-zinc-100 my-2" />
            <div className="flex justify-between text-sm">
              <span className="text-zinc-950 font-black uppercase tracking-tighter">Total On-Road</span>
              <span className="font-mono font-bold text-blue-600">₹{Math.round(results.totalOnRoad).toLocaleString()}</span>
            </div>
            <div className="h-px bg-zinc-100 my-2" />
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Monthly EMI</span>
              <span className="font-mono font-bold">₹{Math.round(results.monthlyEMI).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Running Cost (Monthly)</span>
              <span className="font-mono font-bold">₹{Math.round(results.monthlyFuel + results.monthlyMaintenance).toLocaleString()}</span>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold">Generated via RideWise App</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={handleCopy}
            className="flex-1 bg-white text-zinc-950 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest flex items-center justify-center space-x-2 hover:bg-zinc-200 transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied Link' : 'Copy Summary'}</span>
          </button>
          <button 
            onClick={onClose}
            className="w-16 bg-zinc-900 text-white py-4 rounded-2xl flex items-center justify-center hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
