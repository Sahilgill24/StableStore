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
import { SIGNUP_API } from "@/lib/endpoints";
import { useToast } from "@/components/ui/use-toast";
import { useStepper } from "../ui/stepper";
import axios from "axios";

import { SEND_OTP_API } from "@/lib/endpoints";
import Spinner from "../ui/spinner";
import { useUserStore } from "@/hooks/useStore";

interface SignUpProps {
  email: string;
  setEmail: (value: React.SetStateAction<string>) => void;
  step: number;
  setStep: (value: React.SetStateAction<number>) => void;
}

export default function SignUp(props: SignUpProps) {
  const { setUser } = useUserStore();
  const [signupPassword, setSignupPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const { nextStep } = useStepper();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    axios
      .post(SIGNUP_API, {
        email: props.email,
        password: signupPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast({
            title: "Account Created :)",
            description: "An OTP will be sent to your email for verification.",
          });
          console.log(res.data.data);
          setUser(res.data.data);
          props.setStep(1);
          console.log("Step: ", props.step);
          nextStep();
        }

        axios
          .post(SEND_OTP_API, {
            email: props.email,
          })
          .then((res) => {
            console.log(res);
            setIsLoading(false);
            toast({
              title: "Check your inbox",
              description: "OTP delivered successfully",
            });
          })
          .catch((err) => {
            console.error(err);
            toast({
              title: "Uh oh!",
              description: "An error occurred while sending the OTP. Is the email valid?",
              variant: "destructive",
            });
          });
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast({
            title: "Uh oh!",
            description: "An account with this email already exists.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Uh oh!",
            description: "An error occurred while creating your account.",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Card className="bg-background border-none">
        <CardHeader>
          <CardTitle className="font-semibold">Sign Up</CardTitle>
          <CardDescription className="font-semibold">
            to use our provider services
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="py-6 px-4"
                required
                placeholder="new-user@stablestore.com"
                defaultValue={props.email}
                onChange={(e) => {
                  props.setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="py-6 px-4"
                required
                defaultValue={signupPassword}
                onChange={(e) => {
                  setSignupPassword(e.target.value);
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button size={"lg"} disabled={loading}>
              {loading ? <Spinner className="w-6 h-6" /> : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
