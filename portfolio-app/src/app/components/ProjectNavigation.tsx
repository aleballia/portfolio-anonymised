"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CaseStudy } from "../../lib/caseStudies";
import styles from "./ProjectNavigation.module.css";
import { AllProjectsModal } from "./AllProjectsModal";

const SCROLL_THRESHOLD = 120;

interface ProjectNavigationProps {
  currentProject: CaseStudy;
  allProjects: CaseStudy[];
  hideAdjacent?: boolean;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentProject,
  allProjects,
  hideAdjacent = true,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const currentIndex = allProjects.findIndex(
    (project) => project.id === currentProject.id
  );

  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <>
      <nav className={`${styles.projectNavigation} ${visible ? styles.visible : ""}`}>
        <div className={`${styles.navigationContainer} px-section`}>
          {/* Previous Project */}
          {!hideAdjacent && (
            <div className={styles.navItem}>
              {previousProject ? (
                <Link href={previousProject.href} className={styles.navLink}>
                  <div className={styles.navDirection}>← Previous</div>
                  <div className={styles.navTitle}>{previousProject.title}</div>
                </Link>
              ) : (
                <div className={styles.navPlaceholder}></div>
              )}
            </div>
          )}

          {/* Next Project */}
          {!hideAdjacent && (
            <div className={styles.navItem}>
              {nextProject ? (
                <Link href={nextProject.href} className={styles.navLink}>
                  <div className={styles.navDirection}>Next →</div>
                  <div className={styles.navTitle}>{nextProject.title}</div>
                </Link>
              ) : (
                <div className={styles.navPlaceholder}></div>
              )}
            </div>
          )}

          {/* View all projects */}
          <div className={styles.navAllItem}>
            <button
              type="button"
              className={styles.allProjectsButton}
              onClick={() => setShowAll(true)}
            >
              View more projects
            </button>
          </div>
        </div>
      </nav>

      <AllProjectsModal open={showAll} onClose={() => setShowAll(false)} currentProjectId={currentProject.id} />
    </>
  );
};

export default ProjectNavigation;
