import React from 'react';
import { BikePreset } from '../data/bikes';
import { ChevronDown, Bike } from 'lucide-react';

interface BikeSelectorProps {
  presets: BikePreset[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const BikeSelector: React.FC<BikeSelectorProps> = ({ presets, selectedId, onSelect }) => {
  return (
    <div className="relative group">
      <div className="flex items-center space-x-3 mb-2">
        <Bike size={16} className="text-blue-500" />
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Select Machine</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
        {presets.map((bike) => (
          <button
            key={bike.id}
            onClick={() => onSelect(bike.id)}
            className={`group relative overflow-hidden rounded-xl transition-all border-2 text-left ${selectedId === bike.id ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-zinc-800 hover:border-zinc-700'}`}
          >
            <div className="aspect-[16/10] relative">
              <img 
                src={bike.image} 
                alt={bike.name} 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>
            <div className="p-3 absolute bottom-0 left-0 right-0">
              <p className="text-[8px] font-black uppercase tracking-widest text-blue-500 leading-none">{bike.brand}</p>
              <p className="text-[10px] font-bold text-white truncate">{bike.name}</p>
            </div>
          </button>
        ))}
        <button
          onClick={() => onSelect('custom')}
          className={`flex flex-col items-center justify-center aspect-[16/10] rounded-xl border-2 transition-all ${selectedId === 'custom' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'}`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Custom</span>
        </button>
      </div>
    </div>
  );
};
