"use client";
import React from "react";
import SvgLogo from "./SvgLogo";
import styles from "./ClientLogos.module.css";

export type ClientLogo = {
  name: string;
  logo: string;
  alt: string;
  link?: string;
};

const clientLogos: ClientLogo[] = [
    {
        name: "Freedom2hear",
        logo: "/logos/f2h-logo.svg",
        alt: "Freedom2hear logo",
        link: "https://freedom2hear.com"
      },
 
    {
        name: "PwC",
        logo: "/logos/pwc-logo.svg",
        alt: "PwC logo",
        link: "https://www.pwc.co.uk"
      },

  {
    name: "THG Ingenuity",
    logo: "/logos/thg-logo.svg",
    alt: "THG logo",
    link: "https://www.thgingenuity.com/"
  },
  {
    name: "Fujifilm",
    logo: "/logos/mf-logo.svg",
    alt: "Fujifilm logo",
    link: "https://my.fujifilm.com"
  },
  {
    name: "Oliver Bonas",
    logo: "/logos/ob-logo.svg",
    alt: "Oliver Bonas logo",
    link: "https://oliverbonas.com"
  },
  {
    name: "Agent Provocateur",
    logo: "/logos/ap-logo.svg",
    alt: "Agent Provocateur logo",
    link: "https://www.agentprovocateur.com/"
  },
  {
    name: "Resi",
    logo: "/logos/resi-logo.svg",
    alt: "Resi logo",
    link: "https://resi.co.uk"
  },
  {
    name: "Tom&Co",
    logo: "/logos/tco-logo.svg",
    alt: "Tom&Co logo",
    link: "https://tomandco.co.uk"
  },
];

const ClientLogos: React.FC = () => {
  return (
    <section className={styles.clientLogosSection}>
      <div className={styles.container}>
        <h2 className="h4" style={{marginBottom: "2rem", textAlign: "left"}}>Brands I’ve worked with</h2>
        <div className={styles.logosGrid}>
          {clientLogos.map((client, index) => (
            <div key={index} className={styles.logoContainer}>
              {client.link ? (
                <a 
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.logoLink}
                  aria-label={`Visit ${client.name} website`}
                >
                  <SvgLogo
                    src={client.logo}
                    alt={client.alt}
                    className={styles.logo}
                  />
                </a>
              ) : (
                <SvgLogo
                  src={client.logo}
                  alt={client.alt}
                  className={styles.logo}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
