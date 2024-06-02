import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
            //TODO: Call the API to convert place ORDER for AKT
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";
import axios from "axios";

import { SIGNUP_API, LOGIN_API, SEND_OTP_API } from "@/lib/endpoints";

export function LoginCard() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(LOGIN_API, {
        email: loginEmail,
        password: loginPassword,
      }, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(SIGNUP_API, {
        email: signupEmail,
        password: signupPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          console.log("Account Created");
          toast({
            title: "Account Created :)",
            description: "You can now login to your account.",
          })
        }
      });

    
  };
  return (
    <Tabs defaultValue="login" className="w-[20rem]">
      <TabsList className="grid w-full shadow-xl grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Log into your API dashboard.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="akash-dev@akashpay.com"
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
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Sign up to use the developer API.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="new-dev@akashpay.com"
                  defaultValue={signupEmail}
                  onChange={(e) => {
                    setSignupEmail(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  defaultValue={signupPassword}
                  onChange={(e) => {
                    setSignupPassword(e.target.value);
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send Maol</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
