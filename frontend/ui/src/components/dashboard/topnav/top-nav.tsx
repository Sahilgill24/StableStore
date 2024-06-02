import { AnimatedGradientText } from "@/components/animated-gradient-text";
import AddProject from "./add-project";
import Profile from "./profile";

export interface TopNavProps {
  projectAdded: boolean;
  setProjectAdded: (value:React.SetStateAction<boolean>) => void;
}

export function TopNav(props: TopNavProps) {
  return (
    <div className="w-full mb-8 flex items-center pr-4 justify-between">
      <h1 className="text-4xl font-bold">
        <AnimatedGradientText text="Dev" /> Dashboard
      </h1>
      <div className="flex gap-4">
        <AddProject projectAdded={props.projectAdded} setProjectAdded={props.setProjectAdded} />
        <Profile />
      </div>
    </div>
  );
}
