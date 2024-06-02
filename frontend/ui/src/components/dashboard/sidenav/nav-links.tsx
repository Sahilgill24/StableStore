import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { SideNavState } from "@/lib/types";
import { Link } from "react-router-dom";

export interface NavLinksProps {
  sideNavStates: SideNavState[];
  activeIndex: number;
  setActiveIndex: (value: React.SetStateAction<number>) => void;
}

export function NavLinks(props: NavLinksProps) {
  return (
    <>
      {props.sideNavStates.map((state, index) => {
        const LinkIcon = state.icon;
        return (
          <>
            {state.component ? (
              <Button
                key={index}
                onClick={() => props.setActiveIndex(index)}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center transition-all duration-200 gap-2 rounded-md bg-card p-3 text-sm font-semibold hover:bg-white/20 hover:text-accent-foreground hover:shadow-2xl text-muted-foreground md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "bg-primary text-accent-foreground hover:bg-primary":
                      index === props.activeIndex,
                  }
                )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{state.label}</p>
              </Button>
            ) : state.href ? (
              <Link
                to={state.href}
                target="_blank"
                key={index}
                className={clsx(
                  "flex h-[48px] grow items-center justify-center transition-all duration-200 gap-2 rounded-md bg-card p-3 text-sm font-semibold hover:bg-white/20 hover:text-accent-foreground hover:shadow-2xl text-muted-foreground md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "bg-primary text-accent-foreground":
                      index === props.activeIndex,
                  }
                )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{state.label}</p>
              </Link>
            ) : null}
          </>
        );
      })}
    </>
  );
}
