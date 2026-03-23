/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bike as BikeIcon, 
  Settings2, 
  BarChart3, 
  Info, 
  Share2, 
  ChevronRight,
  ShieldAlert,
  Zap,
  ShoppingBag,
  Plus
} from 'lucide-react';

import { Slider } from './components/ui/Slider';
import { useCalculator, CalculatorInputs, CalculatorResults } from './hooks/useCalculator';
import { useBikePresets } from './hooks/useBikePresets';
import { AffordabilityMeter } from './components/AffordabilityMeter';
import { BreakdownGrid } from './components/BreakdownGrid';
import { BikeSelector } from './components/BikeSelector';
import { SavingsEngine } from './components/SavingsEngine';
import { ShareSnapshot } from './components/ShareSnapshot';
import { BikePreset } from './data/bikes';

const ACCESSORY_CATEGORIES = [
  { id: 'helmet', name: 'Helmet' },
  { id: 'jacket', name: 'Riding Jacket' },
  { id: 'gloves', name: 'Gloves' },
  { id: 'boots', name: 'Riding Boots' },
];

export default function App() {
  const { selectedBike, selectedBikeId, selectBike, presets } = useBikePresets();
  
  const [showShare, setShowShare] = useState(false);

  // Input State
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [monthlyTravel, setMonthlyTravel] = useState(1000);
  const [lifespan, setLifespan] = useState(5);
  const [exShowroom, setExShowroom] = useState(selectedBike.price);
  const [downPayment, setDownPayment] = useState(50000);
  const [isDPPercentage, setIsDPPercentage] = useState(false);
  const [tenure, setTenure] = useState(3);
  const [interestRate, setInterestRate] = useState(10);
  const [fuelPrice, setFuelPrice] = useState(100);
  const [mileage, setMileage] = useState(selectedBike.mileage);
  const [maintenanceAnnual, setMaintenanceAnnual] = useState(selectedBike.maintenance);
  const [insuranceAnnual, setInsuranceAnnual] = useState(8000);
  
  // Accessories State
  const [accessoryPrices, setAccessoryPrices] = useState<Record<string, number>>({
    helmet: 0,
    jacket: 0,
    gloves: 0,
    boots: 0,
  });
  const [customAccessoriesCost, setCustomAccessoriesCost] = useState(0);

  // Update dependent values when bike changes
  useEffect(() => {
    setExShowroom(selectedBike.price);
    setMileage(selectedBike.mileage);
    setMaintenanceAnnual(selectedBike.maintenance);
  }, [selectedBike]);

  const totalAccessoriesCost = useMemo(() => {
    let cost = customAccessoriesCost;
    Object.values(accessoryPrices).forEach(p => cost += p);
    return cost;
  }, [accessoryPrices, customAccessoriesCost]);

  const inputs: CalculatorInputs = {
    annualIncome,
    monthlyTravel,
    lifespan,
    exShowroom,
    cc: selectedBike.cc,
    downPayment: isDPPercentage ? (exShowroom * downPayment / 100) : downPayment,
    tenure,
    interestRate,
    fuelPrice,
    mileage,
    maintenanceAnnual,
    insuranceAnnual,
    accessoriesCost: totalAccessoriesCost,
  };

  const results = useCalculator(inputs);

  return (
    <div className="h-screen h-[100dvh] flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md flex-shrink-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter uppercase">RideWise</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowShare(true)}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center space-x-2"
            >
              <Share2 size={14} />
              <span>Share Config</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto flex flex-col lg:flex-row">
          
          {/* Left Column: Inputs (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-12 custom-scrollbar">
            <div className="max-w-3xl space-y-12 pb-20">
              {/* Hero Bike Section */}
              <section className="relative overflow-hidden rounded-[40px] bg-zinc-900 border border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />
                <motion.img 
                  key={selectedBike.image}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  src={selectedBike.image} 
                  alt={selectedBike.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-20 p-10 flex flex-col justify-center h-[350px]">
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Selected Machine</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-4">
                      {selectedBike.brand}<br />
                      <span className="text-blue-600">{selectedBike.name}</span>
                    </h2>
                    <div className="flex items-center space-x-6 mt-6">
                      <div>
                        <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Ex-Showroom</p>
                        <p className="text-xl font-mono font-bold">₹{(selectedBike.price / 100000).toFixed(2)}L</p>
                      </div>
                      <div className="w-px h-8 bg-zinc-800" />
                      <div>
                        <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Mileage</p>
                        <p className="text-xl font-mono font-bold">{selectedBike.mileage} <span className="text-xs text-zinc-500">kmpl</span></p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Core Configuration */}
              <section className="space-y-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold tracking-tight">Configure Your Ride</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BikeSelector 
                    presets={presets} 
                    selectedId={selectedBikeId} 
                    onSelect={selectBike} 
                  />
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 size={16} className="text-blue-500" />
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Annual Net Income</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-mono">INR</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Config */}
                <div className="space-y-8 pt-6 border-t border-zinc-900">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag size={18} className="text-blue-500" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Purchase Configuration</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <Slider 
                      label="Ex-Showroom Price" 
                      value={exShowroom} 
                      min={50000} 
                      max={1000000} 
                      step={1000}
                      prefix="₹"
                      onChange={setExShowroom}
                      formatValue={(v) => (v / 100000).toFixed(1) + 'L'}
                    />
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">Down Payment</label>
                        <button 
                          onClick={() => {
                            setIsDPPercentage(!isDPPercentage);
                            setDownPayment(isDPPercentage ? (exShowroom * 0.2) : 20);
                          }}
                          className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors"
                        >
                          Switch to {isDPPercentage ? 'Value' : '%'}
                        </button>
                      </div>
                      <Slider 
                        label="" 
                        value={downPayment} 
                        min={0} 
                        max={isDPPercentage ? 100 : exShowroom} 
                        step={isDPPercentage ? 1 : 5000}
                        prefix={isDPPercentage ? '' : '₹'}
                        suffix={isDPPercentage ? '%' : ''}
                        onChange={setDownPayment}
                        formatValue={(v) => isDPPercentage ? v + '%' : (v / 1000).toFixed(0) + 'K'}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">Loan Tenure</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[2, 3, 4, 5].map((year) => (
                          <button
                            key={year}
                            onClick={() => setTenure(year)}
                            className={`py-2 rounded-xl text-xs font-bold transition-all border ${tenure === year ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
                          >
                            {year}Y
                          </button>
                        ))}
                      </div>
                    </div>
                    <Slider 
                      label="Interest Rate" 
                      value={interestRate} 
                      min={5} 
                      max={20} 
                      step={0.5}
                      suffix="%"
                      onChange={setInterestRate}
                    />
                  </div>
                </div>

                {/* Running Config */}
                <div className="space-y-8 pt-10 border-t border-zinc-900">
                  <div className="flex items-center space-x-2">
                    <Zap size={18} className="text-blue-500" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Running Configuration</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <Slider 
                      label="Monthly Travel" 
                      value={monthlyTravel} 
                      min={100} 
                      max={5000} 
                      step={100}
                      suffix=" km"
                      onChange={setMonthlyTravel}
                    />
                    <Slider 
                      label="Bike Mileage" 
                      value={mileage} 
                      min={10} 
                      max={100} 
                      step={1}
                      suffix=" kmpl"
                      onChange={setMileage}
                    />
                    <Slider 
                      label="Fuel Price" 
                      value={fuelPrice} 
                      min={80} 
                      max={150} 
                      step={1}
                      prefix="₹"
                      onChange={setFuelPrice}
                    />
                    <Slider 
                      label="Annual Maintenance" 
                      value={maintenanceAnnual} 
                      min={1000} 
                      max={50000} 
                      step={500}
                      prefix="₹"
                      onChange={setMaintenanceAnnual}
                    />
                    <div className="space-y-4">
                      <label className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em]">Ownership Lifespan</label>
                      <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                        {[5, 8, 10].map((year) => (
                          <button
                            key={year}
                            onClick={() => setLifespan(year)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${lifespan === year ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                          >
                            {year}Y
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accessories Section */}
                <div className="space-y-8 pt-10 border-t border-zinc-900">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag size={18} className="text-blue-500" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Riding Gear & Accessories</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ACCESSORY_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">{cat.name}</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={accessoryPrices[cat.id]}
                            onChange={(e) => setAccessoryPrices(prev => ({ ...prev, [cat.id]: Number(e.target.value) }))}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
                            placeholder="Enter price..."
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-mono">₹</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Plus size={16} className="text-zinc-500" />
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Other Custom Accessories</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-blue-500">₹{customAccessoriesCost.toLocaleString()}</span>
                    </div>
                    <Slider 
                      label="" 
                      value={customAccessoriesCost} 
                      min={0} 
                      max={100000} 
                      step={1000}
                      prefix="₹"
                      onChange={setCustomAccessoriesCost}
                      formatValue={(v) => (v / 1000).toFixed(0) + 'K'}
                    />
                  </div>
                </div>

                <div className="p-6 bg-zinc-900/30 rounded-3xl border border-zinc-800/50 flex items-start space-x-4">
                  <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight">On-Road Estimate</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      GST of <span className="text-zinc-300">{results.gstRate}%</span> (based on {selectedBike.cc}cc engine), RTO/Registration (~12%), and selected accessories worth <span className="text-zinc-300">₹{totalAccessoriesCost.toLocaleString()}</span> are factored into the total buying cost.
                    </p>
                  </div>
                </div>

                <SavingsEngine 
                  downPayment={downPayment}
                  emi={results.monthlyEMI}
                  tenure={tenure}
                  interestRate={interestRate}
                  loanAmount={results.loanAmount}
                  onUpdateDownPayment={setDownPayment}
                  onUpdateTenure={setTenure}
                />
              </section>

              {/* Footer inside scrollable area */}
              <footer className="border-t border-zinc-900 py-12 mt-20">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                  <div className="flex items-center space-x-2 opacity-50">
                    <Zap size={16} />
                    <span className="text-sm font-bold uppercase tracking-tighter">RideWise</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 max-w-md text-center md:text-right leading-relaxed">
                    RideWise is a financial tool designed to help you make informed decisions. Estimates are based on standard formulas and user inputs. Always consult a financial advisor before major purchases.
                  </p>
                </div>
              </footer>
            </div>
          </div>

          {/* Right Column: Results (Fixed) */}
          <aside 
            id="results-pane"
            className="lg:w-[400px] xl:w-[450px] flex-shrink-0 border-l border-zinc-900 bg-zinc-950/50 backdrop-blur-xl p-8 overflow-y-auto custom-scrollbar"
          >
            <div className="space-y-8 pb-24 lg:pb-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black tracking-tighter uppercase">Financial Summary</h2>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>

              <AffordabilityMeter 
                percentage={results.affordabilityPercentage} 
                status={results.status}
                statusColor={results.statusColor}
              />

              <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">On-Road Cost</h3>
                  <div className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-tighter text-zinc-400">
                    {selectedBike.cc}cc Engine
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Ex-Showroom</span>
                    <span className="text-sm font-mono font-bold">₹{exShowroom.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">GST ({results.gstRate}%)</span>
                    <span className="text-sm font-mono font-bold text-rose-500">+₹{Math.round(results.gstAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">RTO & Registration (~12%)</span>
                    <span className="text-sm font-mono font-bold text-rose-500">+₹{Math.round(exShowroom * 0.12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Insurance (Annual)</span>
                    <span className="text-sm font-mono font-bold text-rose-500">+₹{insuranceAnnual.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Accessories & Gear</span>
                    <span className="text-sm font-mono font-bold text-rose-500">+₹{totalAccessoriesCost.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-zinc-800" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-300 font-bold">Total On-Road</span>
                    <span className="text-lg font-mono font-bold text-white">₹{Math.round(results.totalOnRoad).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Monthly Breakdown</h3>
                </div>
                <BreakdownGrid 
                  emi={results.monthlyEMI}
                  fuel={results.monthlyFuel}
                  maintenance={results.monthlyMaintenance}
                  insurance={results.monthlyInsurance}
                  total={results.totalMonthlyCost}
                />
              </div>

              {results.affordabilityPercentage > 30 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start space-x-3"
                >
                  <ShieldAlert size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-200 leading-relaxed">
                    Warning: This bike costs more than 30% of your monthly income.
                  </p>
                </motion.div>
              )}

              <div className="flex items-center justify-center space-x-2 text-zinc-600">
                <Settings2 size={14} />
                <span className="text-[10px] uppercase tracking-widest font-bold">RideWise Engine v1.0</span>
              </div>
            </div>
          </aside>

          {/* Mobile Sticky Summary */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 z-40">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div>
                <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Total Monthly</p>
                <p className="text-xl font-mono font-bold text-blue-500">₹{Math.round(results.totalMonthlyCost).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => {
                  document.getElementById('results-pane')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Share Snapshot Overlay */}
      {showShare && (
        <ShareSnapshot 
          bike={selectedBike}
          results={results}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}
