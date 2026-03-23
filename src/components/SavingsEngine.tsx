import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, TrendingDown, Clock } from 'lucide-react';

interface SavingsEngineProps {
  downPayment: number;
  emi: number;
  tenure: number;
  interestRate: number;
  loanAmount: number;
  onUpdateDownPayment: (val: number) => void;
  onUpdateTenure: (val: number) => void;
}

export const SavingsEngine: React.FC<SavingsEngineProps> = ({ 
  downPayment, 
  emi, 
  tenure, 
  interestRate, 
  loanAmount,
  onUpdateDownPayment,
  onUpdateTenure
}) => {
  // Suggestion 1: Increase DP
  const extraDP = 20000;
  const newLoan = Math.max(0, loanAmount - extraDP);
  const r = interestRate / 12 / 100;
  const n = tenure * 12;
  const newEMI = (newLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const emiSavings = emi - newEMI;

  // Suggestion 2: Reduce Tenure
  const reducedTenure = Math.max(1, tenure - 1);
  const nReduced = reducedTenure * 12;
  const emiReducedTenure = (loanAmount * r * Math.pow(1 + r, nReduced)) / (Math.pow(1 + r, nReduced) - 1);
  const totalInterestOld = (emi * tenure * 12) - loanAmount;
  const totalInterestNew = (emiReducedTenure * reducedTenure * 12) - loanAmount;
  const interestSavings = totalInterestOld - totalInterestNew;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-2">
        <Lightbulb size={16} className="text-amber-500" />
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Optimization Engine</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onUpdateDownPayment(downPayment + extraDP)}
          className="flex flex-col items-start p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-left hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-center space-x-2 text-blue-500 mb-2">
            <TrendingDown size={16} />
            <span className="text-xs font-bold uppercase">Reduce Monthly EMI</span>
          </div>
          <p className="text-sm text-zinc-300">
            Increase downpayment by <span className="text-white font-mono">₹{extraDP.toLocaleString()}</span> to save <span className="text-emerald-500 font-mono">₹{Math.round(emiSavings).toLocaleString()}/mo</span>.
          </p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onUpdateTenure(reducedTenure)}
          className="flex flex-col items-start p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-left hover:border-purple-500/50 transition-colors"
        >
          <div className="flex items-center space-x-2 text-purple-500 mb-2">
            <Clock size={16} />
            <span className="text-xs font-bold uppercase">Save on Interest</span>
          </div>
          <p className="text-sm text-zinc-300">
            Reduce tenure to <span className="text-white font-mono">{reducedTenure} years</span> to save <span className="text-emerald-500 font-mono">₹{Math.round(interestSavings).toLocaleString()}</span> in total interest.
          </p>
        </motion.button>
      </div>
    </div>
  );
};
