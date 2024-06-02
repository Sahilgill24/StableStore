import { TopNav, TopNavProps } from "./topnav/top-nav";
import ProjectCarousel from "./projects/project-carousel";
import { Project } from "@/lib/types";

interface ApiDashboardProps extends TopNavProps {
  projects: Project[];
}

export default function ApiDashboard(props: ApiDashboardProps) {
  return (
    <div className="h-full w-full">
      <TopNav
        projectAdded={props.projectAdded}
        setProjectAdded={props.setProjectAdded}
      />
      <ProjectCarousel projects={props.projects} />
    </div>
  );
}
