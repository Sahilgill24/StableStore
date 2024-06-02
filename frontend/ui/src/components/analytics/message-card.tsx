import { Message } from "@/lib/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function MessageCard(props: Message) {
  return (
    <>
      <Card className="drop-shadow-sm mb-4 px-2 transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>{props.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-row justify-between">
                <CardDescription>PieceCID</CardDescription>
                <CardDescription className="text-foreground">
                  {props.pieceCID.slice(0, 10)}...
                </CardDescription>
              </div>
              <div className="flex flex-row justify-between">
                <CardDescription>Client</CardDescription>
                <CardDescription className="text-foreground">
                  {props.client}
                </CardDescription>
              </div>
              <div className="flex flex-row justify-between">
                <CardDescription>Start Epoch</CardDescription>
                <CardDescription className="text-foreground">
                  {props.startEpoch}
                </CardDescription>
              </div>
              <div className="flex flex-row justify-between">
                <CardDescription>End Epoch</CardDescription>
                <CardDescription className="text-foreground">
                  {props.endEpoch}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-row justify-between">
                <CardDescription>Provider Collateral</CardDescription>
                <CardDescription className="text-foreground">
                  {props.providerCollateral}
                </CardDescription>
              </div>
              <div className="flex flex-row justify-between">
                <CardDescription>Client Collateral</CardDescription>
                <CardDescription className="text-foreground">
                  {props.clientCollateral}
                </CardDescription>
              </div>
              <div className="flex flex-row justify-between">
                <CardDescription>Storage Price Per Epoch</CardDescription>
                <CardDescription className="text-foreground">
                  {props.storagePricePerEpoch}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
