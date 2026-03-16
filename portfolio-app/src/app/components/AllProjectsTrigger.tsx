"use client";

import React, { useState } from "react";
import { AllProjectsModal } from "./AllProjectsModal";

export const AllProjectsTrigger: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 60 }}>
        <button
          onClick={() => setOpen(true)}
          className="btn btn-small"
          type="button"
        >
          All projects
        </button>
      </div>
      <AllProjectsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

