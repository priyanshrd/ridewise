import { useMemo } from 'react';

export interface CalculatorInputs {
  annualIncome: number;
  monthlyTravel: number;
  lifespan: number;
  exShowroom: number;
  taxRate?: number; // Optional now, as we use CC-based logic
  cc: number;
  downPayment: number;
  tenure: number;
  interestRate: number;
  fuelPrice: number;
  mileage: number;
  maintenanceAnnual: number;
  insuranceAnnual: number;
  accessoriesCost: number;
}

export interface CalculatorResults {
  monthlyIncome: number;
  totalOnRoad: number;
  loanAmount: number;
  monthlyEMI: number;
  monthlyFuel: number;
  monthlyMaintenance: number;
  monthlyInsurance: number;
  totalMonthlyCost: number;
  affordabilityPercentage: number;
  totalOwnershipCost: number;
  gstRate: number;
  gstAmount: number;
  accessoriesCost: number;
  status: 'Highly Affordable' | 'Affordable' | 'Stretching' | 'Unaffordable';
  statusColor: string;
}

export function useCalculator(inputs: CalculatorInputs): CalculatorResults {
  return useMemo(() => {
    const {
      annualIncome,
      monthlyTravel,
      lifespan,
      exShowroom,
      cc,
      downPayment,
      tenure,
      interestRate,
      fuelPrice,
      mileage,
      maintenanceAnnual,
      insuranceAnnual,
      accessoriesCost,
    } = inputs;

    const monthlyIncome = annualIncome / 12;
    
    // GST Logic: 18% for < 350cc, 40% for >= 350cc (as per user request)
    // Note: Real world is usually 28% + Cess, but following user's specific request for 18/40
    const gstRate = cc < 350 ? 18 : 40;
    const gstAmount = exShowroom * (gstRate / 100);
    
    // RTO/Registration is roughly 10-15% depending on state, let's assume 12%
    const rtoAmount = exShowroom * 0.12;
    
    const totalOnRoad = exShowroom + gstAmount + rtoAmount + insuranceAnnual + accessoriesCost;
    const loanAmount = Math.max(0, totalOnRoad - downPayment);

    // EMI Calculation
    let monthlyEMI = 0;
    if (loanAmount > 0 && interestRate > 0) {
      const r = interestRate / 12 / 100;
      const n = tenure * 12;
      monthlyEMI = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (loanAmount > 0) {
      monthlyEMI = loanAmount / (tenure * 12);
    }

    const monthlyFuel = mileage > 0 ? (monthlyTravel / mileage) * fuelPrice : 0;
    const monthlyMaintenance = maintenanceAnnual / 12;
    const monthlyInsurance = insuranceAnnual / 12;

    const totalMonthlyCost = monthlyEMI + monthlyFuel + monthlyMaintenance + monthlyInsurance;
    const affordabilityPercentage = monthlyIncome > 0 ? (totalMonthlyCost / monthlyIncome) * 100 : 0;

    const totalOwnershipCost = totalOnRoad + (monthlyFuel + monthlyMaintenance + monthlyInsurance) * 12 * lifespan + (monthlyEMI * 12 * tenure - loanAmount);

    let status: CalculatorResults['status'] = 'Highly Affordable';
    let statusColor = 'text-emerald-500';

    if (affordabilityPercentage > 25) {
      status = 'Unaffordable';
      statusColor = 'text-rose-500';
    } else if (affordabilityPercentage > 20) {
      status = 'Stretching';
      statusColor = 'text-amber-500';
    } else if (affordabilityPercentage > 15) {
      status = 'Affordable';
      statusColor = 'text-blue-500';
    }

    return {
      monthlyIncome,
      totalOnRoad,
      loanAmount,
      monthlyEMI,
      monthlyFuel,
      monthlyMaintenance,
      monthlyInsurance,
      totalMonthlyCost,
      affordabilityPercentage,
      totalOwnershipCost,
      gstRate,
      gstAmount,
      accessoriesCost,
      status,
      statusColor,
    };
  }, [inputs]);
}
