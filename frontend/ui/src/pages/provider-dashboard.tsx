import { AnimatedGradientText } from "@/components/animated-gradient-text";
import EscrowWallet from "@/components/providerDashboard/escrow-wallet";
import ProviderId from "@/components/providerDashboard/provider-id";
import Deals from "@/components/providerDashboard/deals";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useUserStore } from "@/hooks/useStore";
import axios from "axios";
import { setProviderIdAPI } from "@/lib/endpoints";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "react-router-dom";

export default function ProviderDashboard() {
  const { user, setUser } = useUserStore()
  const [providerId, setProviderId] = useState(user?.providerId);
  const [escrowWallet, setEscrowWallet] = useState<string | null>('0x67ff09c184d8e9e7B90C5187ED04cbFbDba741C8');
  // console.log(providerId)
  useEffect(() => {
    if (providerId !== '' && providerId !== null && providerId !== undefined) {
      axios.post(setProviderIdAPI, {
        providerId: providerId
      }, {
        withCredentials: true
      })
        .then(res => {
          if (res.status === 200) {
            setUser(res.data.data)
            toast({
              description: "Provider ID updated successfully!"
            })
          }
        })
        .catch(err => {
          redirect('/sign-up')
        })
    }
  }, [providerId])
  //TODO: Fetch providerId and escrowWallet from the backend
  return (
    <div className="h-screen flex flex-col w-[80%] mx-auto px-2 py-6">
      <h1 className="text-4xl font-bold">
        <AnimatedGradientText text="Provider" /> Dashboard
      </h1>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <EscrowWallet escrowWallet={escrowWallet} />
          </div>
          <Separator orientation="vertical" />
          <div className="flex-1">
            <ProviderId providerId={providerId} setProviderId={setProviderId} />
          </div>
        </div>
        <hr />{
          <Deals providerId={providerId} />}
      </div>
    </div>
  );
}
