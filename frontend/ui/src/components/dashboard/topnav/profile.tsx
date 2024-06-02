import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/hooks/useStore";
import { LOGOUT_API } from "@/lib/endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useUserStore();
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
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                    alt="user"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-white/5">
            <p className="text-xs font-semibold">Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent className="w-fit p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-bold">
          <p className="leading-none">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-primary">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
