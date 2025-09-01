"use client";

import React from 'react';
import Stats from '../components/Stats';

export default function TestStats() {
  const sampleStats = [
    {
      label: 'Engaged Sessions',
      value: '+140%',
      change: 'uplift',
      changeType: 'positive' as const
    },
    {
      label: 'Organic Page Views',
      value: '+230%',
      change: 'increase',
      changeType: 'positive' as const
    },
    {
      label: 'New Users From Organic Search',
      value: '+740%',
      change: 'growth',
      changeType: 'positive' as const
    },
    {
      label: 'Views Per Session',
      value: '+6%',
      change: 'improvement',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Stats Component Test</h1>
        
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Grid Layout</h2>
            <Stats 
              title="Performance Metrics" 
              stats={sampleStats} 
              layout="grid" 
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">List Layout</h2>
            <Stats 
              title="Key Results" 
              stats={sampleStats} 
              layout="list" 
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">No Title</h2>
            <Stats stats={sampleStats} />
          </div>
        </div>
      </div>
    </div>
  );
}
