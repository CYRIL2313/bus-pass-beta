'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BusPassData {
  college: string;
  name: string;
  admissionNumber: string;
  destination: string;
  fare: number;
  paymentMethod: 'online' | 'upfront' | null;
  paymentStatus: 'pending' | 'paid' | null;
}

interface BusPassContextType {
  data: BusPassData;
  updateData: (updates: Partial<BusPassData>) => void;
  resetData: () => void;
}

const initialData: BusPassData = {
  college: '',
  name: '',
  admissionNumber: 'SJ',
  destination: '',
  fare: 0,
  paymentMethod: null,
  paymentStatus: null,
};

const BusPassContext = createContext<BusPassContextType | undefined>(undefined);

export function BusPassProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BusPassData>(initialData);

  const updateData = (updates: Partial<BusPassData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
  };

  return (
    <BusPassContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </BusPassContext.Provider>
  );
}

export function useBusPass() {
  const context = useContext(BusPassContext);
  if (context === undefined) {
    throw new Error('useBusPass must be used within a BusPassProvider');
  }
  return context;
}