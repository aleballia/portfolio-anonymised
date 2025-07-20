import React from "react";
import AuroraBackground from "../components/AuroraBackground";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <AuroraBackground />
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </div>
  );
}