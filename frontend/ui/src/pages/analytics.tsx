import { AnimatedGradientText } from "@/components/animated-gradient-text";
import { Overview } from "@/components/analytics/overview";
import styles from "./pages.module.css";
import { Message } from "@/lib/types";
import MessageCard from "@/components/analytics/message-card";
import { useEffect, useState } from "react";
import { getDealInfo, getPowerAPI } from "@/lib/endpoints";
import { useUserStore } from "@/hooks/useStore";
import axios from "axios";
import { set } from "date-fns";
import Spinner from "@/components/ui/spinner";


function calculateFilecoinDealAmount(
  startEpoch: number,
  endEpoch: number,
  storagePricePerEpoch: number,
  pieceSize: number
): BigInt {
  // Deal duration calculation
  const dealDuration = endEpoch - startEpoch + 1;

  // Total storage cost calculation
  const totalStorageCost = dealDuration * storagePricePerEpoch;

  // Estimated total deal amount (assuming 1 FIL per byte-year)
  const estimatedTotalAmount = totalStorageCost * pieceSize;

  return (BigInt(estimatedTotalAmount) / BigInt(10 ** 23));
}


export default function Analytics() {
  const [data, setData] = useState<Message[]>([])
  const { user, setUser } = useUserStore()
  const [laoding, setLoading] = useState<boolean>(false)
  useEffect(() => {
    console.log(user?.providerId)
    if (user?.providerId) {
      setLoading(true)
      console.log(getDealInfo(user?.providerId))
      axios.get(getDealInfo(user?.providerId), {
        withCredentials: true,
      }).then((res) => {
        console.log(res.data)
        setData(res.data)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    if(user?.providerId){
      axios.get(getPowerAPI(user.providerId), {
        withCredentials: true
      }).then((res) => {
        setAdjustedPower(res.data.RawBytePower)
        setRawBytePower(res.data.QualityAdjPower)
      })
    }
  })

  const [adjustedBalance, setAdjustedBalance] = useState<number>(282411.7772);
  const [adjustedPower, setAdjustedPower] = useState<number>(30.66);
  const [rawBytePower, setRawBytePower] = useState<number>(11.31);



  return (
    <div className="h-screen flex flex-col w-[80%] mx-auto px-2 py-6">
      <h1 className="text-4xl mb-6 font-bold">
        <AnimatedGradientText text="Analytics" /> Dashboard
      </h1>
      <Overview
        adjustedBalance={adjustedBalance}
        adjustedPower={adjustedPower}
        rawBytePower={rawBytePower}
      />
      <h2 className="text-2xl mb-6 font-bold">Message History</h2>
      <div
        className={`h-[50vh] my-4 border-b px-4 overflow-auto ${styles.sleek_scrollbar}`}
      >
        {laoding ? <div className="flex w-full justify-center">
          <Spinner className="w-10 h-10" />
        </div> : (

          data.length > 0 && data?.map((message, index) => (
            <MessageCard key={index} {...message} />
          ))
        )}

      </div>
    </div>
  );
}
