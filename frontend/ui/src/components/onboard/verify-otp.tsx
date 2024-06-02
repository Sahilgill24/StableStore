import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStepper } from "../ui/stepper";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { VERIFY_OTP_API } from "@/lib/endpoints";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import Spinner from "../ui/spinner";
import { useUserStore } from "@/hooks/useStore";

interface VerifyOtpProps {
  email: string;
  step: number;
  setStep: (value: React.SetStateAction<number>) => void;
  setHasCompletedAllSteps: React.Dispatch<React.SetStateAction<boolean>>
}

export default function VerifyOtp(props: VerifyOtpProps) {
  const { setUser } = useUserStore();
  const [value, setValue] = useState("");
  const [loading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { nextStep } = useStepper();
  const verify = async () => {
    setIsLoading(true);
    axios
      .post(VERIFY_OTP_API, {
        email: props.email,
        otp: value,
      })
      .then((res) => {
        if (res.status === 200) {
          toast({
            description: "Email verified successfully!",
          });
        }
        nextStep();
        props.setHasCompletedAllSteps(true);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setUser(null);
          toast({
            title: "Invalid OTP",
            description: "The OTP entered is invalid. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Card className="border-none bg-background">
      <CardHeader>
        <CardTitle className="font-semibold">Verify your Email</CardTitle>
        <CardDescription className="font-semibold">
          Enter the OTP sent to your email id.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <InputOTP
              maxLength={6}
              className="w-full"
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup className="*:h-14 *:w-20 *:text-lg">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button size={"lg"} disabled={loading} onClick={verify}>
            {loading ? <Spinner className="w-6 h-6" /> : "Verify"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
