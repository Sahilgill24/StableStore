import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";

import SignUp from "./sign-up";
import VerifyOtp from "./verify-otp";

import signupImg from "@/assets/onboard/signup.svg";
import verificationImg from "@/assets/onboard/verification.svg";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function OnboardStepper() {
  const steps = [
    { label: "Sign Up" },
    { label: "Verification" },
  ] satisfies StepItem[];

  const stepMetadata = [
    { label: "Welcome to StableStore :)", img: signupImg },
    { label: "Let's verify your email!", img: verificationImg },
  ];

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [hasCompletedAllSteps, setHasCompletedAllSteps] = useState(false);
  console.log("hasCompletedAllSteps", hasCompletedAllSteps);

  return (
    <div className="flex w-full h-screen gap-4">
      <div className="w-[40%] flex items-center flex-col bg-white/5 justify-center">
        <p className="text-3xl mb-6 font-semibold">
          {stepMetadata[step].label}
        </p>
        <img src={stepMetadata[step].img} className="h-[300px]" alt="Sign Up" />
      </div>
      <div className="flex flex-col gap-4 w-[56%] my-0 ms-auto justify-center align-center">
        <Stepper
          initialStep={0}
          steps={steps}
          className="w-[60%] justify-start"
        >
          {steps.map(({ label }, index) => {
            return (
              <Step key={label} label={label}>
                <div className="w-[64%] h-[20rem]">
                  {index == 0 && (
                    <SignUp
                      email={email}
                      setEmail={setEmail}
                      step={step}
                      setStep={setStep}
                    />
                  )}
                  {(index == 1 && !hasCompletedAllSteps) && (
                    <VerifyOtp email={email} step={step} setStep={setStep} setHasCompletedAllSteps={setHasCompletedAllSteps} />
                  )}
                </div>
              </Step>
            );
          })}
          {hasCompletedAllSteps && (
            <Card className="bg-background w-[64%] h-[20rem] border-none">
              <CardHeader>
                <CardTitle>You are now ready to use Stable Store!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You have completed all the steps required to use Stable Store. Now
                  login into the dashboard.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link to="/login">
                  <Button size={"lg"}>Login</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </Stepper>
      </div>
    </div>
  );
}
