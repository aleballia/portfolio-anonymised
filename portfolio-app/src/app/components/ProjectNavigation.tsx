"use client";

import Link from "next/link";
import { CaseStudy } from "../../lib/caseStudies";
import styles from "./ProjectNavigation.module.css";

interface ProjectNavigationProps {
  currentProject: CaseStudy;
  allProjects: CaseStudy[];
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  currentProject,
  allProjects,
}) => {
  const currentIndex = allProjects.findIndex(
    (project) => project.id === currentProject.id
  );

  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <nav className={styles.projectNavigation}>
      <div className={`${styles.navigationContainer} px-section`}>
        {/* Previous Project */}
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

        {/* Next Project */}
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
      </div>
    </nav>
  );
};

export default ProjectNavigation;
