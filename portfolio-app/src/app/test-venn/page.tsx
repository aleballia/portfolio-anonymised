"use client";

import VennInnovation from '../components/VennInnovation';

export default function TestVennPage() {
  return (
    <div style={{ 

    }}>
      
      <div style={{ 

      }}>        
        <VennInnovation 
          title="Innovation Approach"
          circles={{
            design: "Design",
            mission: "Mission",
            technology: "Technology", 
            business: "Business"
          }}
        />
      </div>
    </div>
  );
}
