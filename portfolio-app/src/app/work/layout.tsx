import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="" style={{  backgroundColor: "transparent"}}>
      {/* Aurora Background */}
      {/* <AuroraBackground
        colorStops={["#AD00A2", "#7E27E0", "#1efb7d"]}
        blend={0.8}
        amplitude={1.0}
        speed={0.8}
      /> */}
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </div>
  );
}