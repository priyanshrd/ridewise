import React from 'react';
import { motion } from 'motion/react';
import { IndianRupee, Fuel, Wrench, ShieldCheck, Wallet } from 'lucide-react';

interface BreakdownCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const BreakdownCard: React.FC<BreakdownCardProps> = ({ label, value, icon, color, description }) => (
  <motion.div 
    layout
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-zinc-900 border border-zinc-800 p-6 rounded-[32px] hover:border-blue-500/50 transition-all group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100 shadow-lg`}>
          {icon}
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-1">{label}</p>
          <motion.p 
            key={value}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-mono font-black"
          >
            ₹{Math.round(value).toLocaleString()}
          </motion.p>
        </div>
      </div>
      <p className="text-[10px] font-bold text-zinc-500 mt-6 group-hover:text-zinc-300 transition-colors uppercase tracking-wider">{description}</p>
    </div>
  </motion.div>
);

interface BreakdownGridProps {
  emi: number;
  fuel: number;
  maintenance: number;
  insurance: number;
  total: number;
}

export const BreakdownGrid: React.FC<BreakdownGridProps> = ({ emi, fuel, maintenance, insurance, total }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BreakdownCard 
        label="Monthly EMI" 
        value={emi} 
        icon={<IndianRupee size={18} />} 
        color="text-blue-500" 
        description="Based on your loan tenure and interest rate."
      />
      <BreakdownCard 
        label="Fuel Cost" 
        value={fuel} 
        icon={<Fuel size={18} />} 
        color="text-amber-500" 
        description="Estimated monthly fuel expense based on travel."
      />
      <BreakdownCard 
        label="Maintenance" 
        value={maintenance} 
        icon={<Wrench size={18} />} 
        color="text-emerald-500" 
        description="Average monthly service and wear-tear cost."
      />
      <BreakdownCard 
        label="Insurance" 
        value={insurance} 
        icon={<ShieldCheck size={18} />} 
        color="text-purple-500" 
        description="Monthly breakdown of annual insurance premium."
      />
      <div className="md:col-span-2 lg:col-span-1">
        <BreakdownCard 
          label="Total Monthly" 
          value={total} 
          icon={<Wallet size={18} />} 
          color="text-white" 
          description="Total recurring cost of owning this bike."
        />
      </div>
    </div>
  );
};
