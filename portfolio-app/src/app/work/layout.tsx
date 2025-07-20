import React from "react";
import AuroraBackground from "../components/AuroraBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <AuroraBackground />
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-start relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}