import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface OverviewProps {
    adjustedBalance: number;
    adjustedPower: number;
    rawBytePower: number;
}

export function Overview(props: OverviewProps) {

  return (
    <>
      <div className="w-full flex gap-2 mb-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">
              Adjusted Balance
            </CardTitle>
            <p className="text-2xl font-semibold">{props.adjustedBalance} FIL</p>
          </CardHeader>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-muted-foreground text-sm">
              Adjusted Power
            </CardTitle>
            <p className="text-2xl font-semibold">{props.adjustedPower} TiB</p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-medium">
              Raw Byte Power:{" "}
              <span className="text-foreground">{props.rawBytePower} TiB</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
