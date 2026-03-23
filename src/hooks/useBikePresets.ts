import { useState, useCallback } from 'react';
import { BIKE_PRESETS, BikePreset } from '../data/bikes';

export function useBikePresets() {
  const [selectedBikeId, setSelectedBikeId] = useState<string>(BIKE_PRESETS[0].id);
  const [customBike, setCustomBike] = useState<BikePreset | null>(null);

  const selectedBike = selectedBikeId === 'custom' 
    ? customBike 
    : BIKE_PRESETS.find(b => b.id === selectedBikeId) || BIKE_PRESETS[0];

  const selectBike = useCallback((id: string) => {
    setSelectedBikeId(id);
  }, []);

  const updateCustomBike = useCallback((updates: Partial<BikePreset>) => {
    setCustomBike(prev => {
      const base = prev || {
        id: 'custom',
        name: 'Custom Bike',
        brand: 'Custom',
        price: 200000,
        mileage: 35,
        maintenance: 5000,
      };
      return { ...base, ...updates };
    });
    setSelectedBikeId('custom');
  }, []);

  return {
    selectedBike,
    selectedBikeId,
    selectBike,
    updateCustomBike,
    presets: BIKE_PRESETS,
  };
}
