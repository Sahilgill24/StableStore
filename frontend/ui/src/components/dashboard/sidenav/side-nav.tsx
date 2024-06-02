import { NavLinks, NavLinksProps } from "./nav-links";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { PowerIcon } from "@heroicons/react/16/solid";
import { useUserStore } from "@/hooks/useStore";
import { LOGOUT_API } from "@/lib/endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function SideNav(props: NavLinksProps) {
  const { setUser } = useUserStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    setUser(null);
    const res = await axios.post(
      LOGOUT_API,
      {},
      {
        withCredentials: true,
      }
    );
    if (res.status === 204) {
      toast({
        description: "Logged out Successfully",
      });
      navigate("/");
    }
  };
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-card p-4 md:h-40"
        to="/"
      >
        <div className="w-32 md:w-40">
          <img src={logo} alt="" />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks {...props} />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form>
          <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-muted-foreground p-3 text-sm font-semibold hover:bg-card hover:text-accent-foreground md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
