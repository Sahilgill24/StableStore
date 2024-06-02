import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";

import { LOGIN_API } from "@/lib/endpoints";
import { redirect, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "@/hooks/useStore";

export default function LoginCard() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {user , setUser} = useUserStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        LOGIN_API,
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("Logged In");
          toast({
            title: "Logged In",
            description: "Getting things ready for you!",
          });
          setUser(res.data.data)
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Invalid Username or Password",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log in to the provider dashboard</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@stablestore.com"
                required
                defaultValue={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                defaultValue={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Spinner className="w-6 h-6" /> : "Login"}
            </Button>
            <Link
              to="/onboard"
              className="text-xs pt-4 -mb-2 font-medium text-white/40 transition-all duration-200 hover:text-white/70"
            >
              Don't have an account?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
