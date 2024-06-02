import SideNav from "@/components/dashboard/sidenav/side-nav";

import { Project } from "@/lib/types";
import { useEffect, useState } from "react";
import { DASHBOARD_API } from "@/lib/endpoints";
import axios from "axios";
import { SideNavState } from "@/lib/types";

import {
  CodeBracketSquareIcon,
  CreditCardIcon,
  LinkIcon,
} from "@heroicons/react/16/solid";

import Exchange from "@/components/payments/exchange";
import ApiDashboard from "@/components/dashboard/api-dashboard";


export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectAdded, setProjectAdded] = useState<boolean>(false);

  const sideNavStates: SideNavState[] = [
    {
      label: "API",
      icon: CodeBracketSquareIcon,
      component: (
        <ApiDashboard
          projectAdded={projectAdded}
          setProjectAdded={setProjectAdded}
          projects={projects}
        />
      ),
    },
    { label: "Pay", icon: CreditCardIcon, component: <Exchange /> },
    { label: "Docs", icon: LinkIcon, href: "https://google.com" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const call = async () => {
      const res = await axios.get(DASHBOARD_API, {
        withCredentials: true,
      });
      const data = await res.data;
      const projectsList: Project[] = data;
      console.log(projectsList);
      setProjects(projectsList);
    };
    call();
  }, [projectAdded]);
  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav
            sideNavStates={sideNavStates}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <div className="flex-grow flex justify-center items-center p-6 md:overflow-y-auto md:p-12">
          {sideNavStates[activeIndex].component}
        </div>
      </div>
    </>
  );
}
