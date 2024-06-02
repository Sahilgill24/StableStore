import { DataTable } from "./data-table";
import { Deal } from "@/lib/types";
import { columns } from "./columns";
import { useState, useEffect } from "react";
import axios from "axios";
import { getDeals } from "@/lib/endpoints";
import { set } from "date-fns";
import Spinner from "@/components/ui/spinner";

interface DealTable {
  providerId: string | null | undefined;
}

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

  return (BigInt(estimatedTotalAmount) / BigInt(10**23));
}


export default function DealTable(props: DealTable) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [Fetching , setFetching] = useState<boolean>(false)
  useEffect(() => {
    console.log(props.providerId)
    if (props.providerId !== '' && props.providerId !== null && props.providerId !== undefined) {
      console.log("Fetching Deals")
      setFetching(true)
      axios.get(getDeals(props.providerId), {
        withCredentials: true
      }).then(res => {
        console.log(res)
        const currentDeals: Deal[] = []
        ///@ts-ignore
        res.data.forEach(element => {
          ///@ts-ignore
          currentDeals.push({
            id: element.key,
            storageFee: calculateFilecoinDealAmount(element.value.Proposal.StartEpoch, element.value.Proposal.EndEpoch, element.value.Proposal.StoragePricePerEpoch, element.value.Proposal.PieceSize),
            startEpoch: element.value.Proposal.StartEpoch,
            endEpoch: element.value.Proposal.EndEpoch,
            pieceSize: element.value.Proposal.PieceSize,
            client: element.value.Proposal.Client,
            status: "pending"
          })
        });
        // if(res.status === 200){
        //   setDeals(res.data.data)
        // }
        setDeals(currentDeals)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        setFetching(false)
      })
    }
  }, [props.providerId]);

  return (
    <div className="py-6">
      {Fetching  ? 
       <Spinner className="w-10 h-10 mx-auto" /> :
       <DataTable columns={columns} data={deals} /> 
       }
      
    </div>
  );
}
