import { MoveRight } from "lucide-react";
import { useState, useEffect } from "react";

interface MetadataProps {
  toCurrency: "usdc" | "fil";
  amountInUsd: number;
}

export default function Metadata(props: MetadataProps) {
  const [finalAmount, setFinalAmount] = useState<number>();
  useEffect(() => {
    async function getAmount() {
      if (props.toCurrency === "usdc") {
        setFinalAmount(props.amountInUsd * 0.96);
      } else if (props.toCurrency === "fil") {
        setFinalAmount(props.amountInUsd / 5.75);
      }
    }
    getAmount();
  }, []);
  return (
    <>
      <div className="bg-muted/60 border my-4 py-3 px-4 rounded-md flex justify-between">
        <h1 className="text-sm text-muted-foreground font-semibold">
          Conversion
        </h1>
        <div className="text-foreground inline-flex items-center gap-2 text-sm font-semibold">
          {props.amountInUsd} USD <MoveRight className="w-4" /> {finalAmount}{" "}
          {props.toCurrency.toUpperCase()}
        </div>
      </div>
    </>
  );
}
