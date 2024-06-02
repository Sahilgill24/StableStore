import Spinner from "@/components/ui/spinner";
import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipboardDocumentListIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { HmacUtil } from "@/utils/hmacUtil";
import { externalConvertToNobleAPI, externalConvertToOSMOAPI } from "@/lib/endpoints";


export default function SuccessfulExternalPayment() {
  const stripe = useStripe();
  const { toast } = useToast();
  const [burnTxHash, setBurnTxHash] = useState("");
  const [osmoHash, setOsmoHash] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [osmoSuccess, setOsmoSuccess] = useState(false);
  const [callCounter, setCallCounter] = useState(0);
  const email = new URLSearchParams(window.location.search).get("email");
  const token = new URLSearchParams(window.location.search).get("token");
  const cryptoCall = async (amount: number) => {
    try {
      const res = await axios.post(externalConvertToNobleAPI, {
        email,
      }, {
        headers: {
          'Access-Token': `Bearer ${token}`,
          "X-TXC-TIMESTAMP": Date.now()
        }
      });

      if (res.status === 200) {
        setBurnTxHash(res.data.data.txhash);
        setSuccessful(true);
        toast({ description: "Reached the Cosmos network 🚀" });
        try {
          const omsoRes = await axios.post(
            externalConvertToOSMOAPI,
            {
              email
            },
            {
              headers: {
                'Access-Token': `Bearer ${token}`,
                "X-TXC-TIMESTAMP": Date.now()
              }
            }
          );

          if (omsoRes.status === 200) {
            setOsmoSuccess(true);
            console.log(res.data.data);
            setOsmoHash(res.data.data.txhash);
            toast({ description: "Converted to OSMO 🌌" });
          }
        } catch (error) {
          console.error(error);
          toast({
            description:
              "Error converting to OSMO. Don't worry we will refund you within 24hrs if the transaction does not Happen",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.error(err);
      toast({
        description:
          "Error converting to Cosmos. Don't worry we will refund you within 24hrs if the transaction does not Happen",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log(clientSecret);
    if (!clientSecret) {
      return;
    }
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        if (paymentIntent !== undefined) {
          switch (paymentIntent.status) {
            case "succeeded":
              toast({ description: "Payment succeeded! Converting to Crypto" });
              if (callCounter === 0) {
                await cryptoCall(paymentIntent.amount / 100);
                setCallCounter(1);
              }
              break;
            case "processing":
              console.log("Your payment is processing.");
              break;
            case "requires_payment_method":
              console.log("Your payment was not successful, please try again.");
              break;
            default:
              console.log("hereh");
              break;
          }
        } else {
          toast({
            description: "An unexpected error occurred.",
            variant: "destructive",
          });
        }
      });
  }, [stripe]);
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-5xl font-extrabold">
        Payment <span className="text-primary">Success</span>
      </h1>
      <p className="text-2xl font-bold text-muted-foreground">
        Coverting into AKT{" "}
        <span className="inline-flex align-middle">
          {!successful ? (
            <Spinner className="w-6 h-6" />
          ) : (
            <Check className="w-6 h-6 text-green-400" />
          )}
        </span>
      </p>
      {successful ? (
        <>
          <Card className="w-[400px] mt-4 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4 gap-2 items-end">
                <div className="flex-1">
                  <Label htmlFor="burnTxHash">Burn Tx Hash</Label>
                  <Input id="burnTxHash" value={burnTxHash} />
                </div>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => {
                    navigator.clipboard.writeText(burnTxHash);
                    toast({
                      description: "Copied to clipboard",
                    });
                  }}
                >
                  <ClipboardDocumentListIcon className="w-4 h-4" />
                </Button>
              </div>
              {osmoSuccess && (
                <>
                  <div className="flex mb-1 gap-2 items-end">
                    <div className="flex-1">
                      <Label htmlFor="osmosisTxHash">Osmosis Tx Hash</Label>
                      <Input id="osmosisTxHash" value={burnTxHash} />
                    </div>
                    <Button variant={"outline"} size={"icon"}>
                      <ClipboardDocumentListIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <Link
                    to={"https://www.mintscan.io/noble-testnet/tx/" + osmoHash}
                    target="_blank"
                    className="text-sm underline text-muted-foreground ml-2 font-medium"
                  >
                    See your osmo transaction at miniscan
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </>
      ) : null}
    </div>
  );
}
