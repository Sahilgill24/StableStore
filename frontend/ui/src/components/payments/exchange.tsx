import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";

import { AnimatedGradientText } from "@/components/animated-gradient-text";

import Metadata from "./metadata";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import stripeLogo from "@/assets/stripe.svg";
import styles from '../components.module.css';
import CheckoutForm from "./stripeCheckout";
import axios from "axios";
import InputBoxes from "./inputboxes";
import { useToast } from "../ui/use-toast";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import keplrIcon from "@/assets/keplr-icon.svg";
import { getKYCStatusAPI } from "@/lib/endpoints";
import { Link } from "react-router-dom";
import { useClientSecretStore, useStripePromiseStore } from "@/hooks/useStore";
import { loadStripe } from "@stripe/stripe-js";
import { set } from "date-fns";
import Spinner from "../ui/spinner";

const PK_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(PK_KEY);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow { }
}


export default function Exchange() {
  const { stripe } = useStripePromiseStore((state) => ({ stripe: state.stripePromise }))
  const { clientSecret, setClientSecret } = useClientSecretStore((state) => state)
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState("");
  const [kycFetcheLoading, setKycFetchedLoading] = useState(false);

  const connectWalletHandle = async () => {
    const chainId = "akashnet-2";
    if (!window.keplr) {
      toast({
        description: "Please install Keplr wallet to proceed",
      });
    } else {
      await window.keplr.enable(chainId);
      const address = await window.keplr.getKey(chainId);
      setWalletAddress(address.bech32Address);
    }
  };

  const api = import.meta.env.VITE_BACKEND_URI;
  const [exchangeAmount, setExchangeAmount] = useState(0.00);
  const [AKTAmount, setAKTAmount] = useState(0);
  const [paymentClickedStripe, setPaymentClickedStripe] = useState(false);
  const [paymentClickedLoading, setPaymentClickedLoading] = useState(false);
  const [kycApproved, setKycApproved] = useState(false);
  const [kycSubmitted, setKycSubmitted] = useState(false);

  useEffect(() => {
    setKycFetchedLoading(true)
    axios.get(getKYCStatusAPI, {
      withCredentials: true
    })
      .then(res => {
        if (res.data.data === "NOTSUBMITTED") {

          setKycApproved(false)
          setKycSubmitted(false)
        } else if (res.data.data === "INPROCESS") {
          setKycApproved(false)
          setKycSubmitted(true)
        } else {
          setKycApproved(true)
          setKycSubmitted(true)
        }
      })
      .catch((err) => {
        console.error(err);
        toast({
          description: "Error fetching KYC status. Please try again later.",
          variant: "destructive"
        })
      })
      .finally(() => {
        setKycFetchedLoading(false)
      })
  }, [])

  const handleStripePayment = async () => {
    setPaymentClickedLoading(true);
    try {
      const response = await axios.post(`${api}/stripe/create-payment-intent`, {
        amount: exchangeAmount,
        walletAddress
      }, {
        withCredentials: true
      });
      if (response.status === 401) {
        toast({
          description: "Please login or have kyc to proceed",
          variant: "destructive"
        })
        return;
      }
      const data = await response.data;
      console.log(data.clientSecret);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    } finally {
      setPaymentClickedLoading(false);
    }
    setPaymentClickedStripe(true);
  };

  // const handleCoinbasePayment = async () => {
  //   setPaymentClickedCoinbase(true);
  // };

  const options: StripeElementsOptions = {
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: "#ff414c",
        colorBackground: "#1c1c1c",
      },
    },
    clientSecret: clientSecret,
  };

  return (
    <>
      {paymentClickedStripe ? (
        <Elements stripe={stripe} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div
          className={`p-1 bg-gradient-to-br w-[400px] from-gradient_1/80 via-purple-500/80 to-gradient_2/80 ${styles.animate_gradient} rounded-xl`}
        >
          <Card className="p-2 shadow-xl border">
            {!paymentClickedLoading ?
              <>
                <CardHeader>
                  <CardTitle>
                    Get <AnimatedGradientText text="AKT" /> Tokens
                  </CardTitle>
                  <CardDescription>Fiat to deployment currency</CardDescription>
                </CardHeader>
                <CardContent>
                  <InputBoxes
                    exchangeAmount={exchangeAmount}
                    AKTAmount={AKTAmount}
                    setExchangeAmount={setExchangeAmount}
                    setAKTAmount={setAKTAmount}
                  />
                  {/* <Metadata /> */}
                  <div className="flex flex-row gap-2 my-4">
                    <Input
                      className="basis-5/6"
                      defaultValue={walletAddress}
                      placeholder="Wallet Address"
                      onChange={() => setWalletAddress(walletAddress)}
                    />
                    <div className="p-1/2 rounded-md bg-gradient-to-b from-teal-500/60 to-violet-500/60">
                      <Button
                        variant={'secondary'}
                        size={'icon'}
                        className="font-bold bg-transparent"
                        onClick={connectWalletHandle}
                      >
                        <img src={keplrIcon} className="w-5" alt="" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant={"gradient"}
                    size={"lg"}
                    className="font-bold w-full"
                    onClick={kycApproved ? handleStripePayment : undefined}
                  >{
                      kycFetcheLoading ? <Spinner className="w-5 h-5" /> : (
                        !kycSubmitted ?
                          <Link to="/kyc">
                            Submit KYC
                          </Link> :
                          kycApproved ? <>
                            Pay with
                            <img src={stripeLogo} className="w-14 -ml-1" />{" "}
                          </> : "KYC in process"
                      )

                    }
                  </Button>
                </CardContent>
              </> :
              <div className="flex justify-center align-center w-full h-full">
                <div className="absolute top-[50%] left-[50%]">
                  <Spinner className="w-10 h-10" />
                </div>
              </div>
            }
          </Card>
        </div >
      )
      }
    </>
  );
}
