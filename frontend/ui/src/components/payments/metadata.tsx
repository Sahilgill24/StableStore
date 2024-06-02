import { useState } from "react";

export default function Metadata() {
  const [bridgeFees, ] = useState(0);
  const [relayerGasFees,] = useState(0.15);
  const [waitTime, ] = useState(20);
  const [maxTransferAmount, ] = useState(1250000);

  const fields = [
    { name: "Bridge Fees", value: bridgeFees, unit: "USD" },
    { name: "Relayer Gas Fees", value: relayerGasFees, unit: "aUSDC" },
    { name: "Wait Time", value: waitTime, unit: "minutes" },
    { name: "Max Transfer Amount", value: maxTransferAmount, unit: "aUSDC" },
  ];

  // TODO: Fetch the data and add skeleton in the meanwhile
  return (
    <>
      <div className="w-full p-3 flex flex-col shadow-sm gap-2 text-xs mb-6 rounded-md bg-white/10">
        {fields.map((field) => {
          return (
            <div className="flex gap-6 justify-between">
              <p className="font-bold">{field.name}</p>{" "}
              <p className="font-semibold">
                {field.value} {field.unit}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
