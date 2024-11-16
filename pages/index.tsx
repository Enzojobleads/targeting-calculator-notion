import React from 'react';
import TargetingCalculator from '../components/targeting/TargetingCalculator';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <TargetingCalculator />
    </div>
  );
}
