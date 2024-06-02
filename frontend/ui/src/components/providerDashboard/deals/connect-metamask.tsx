import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import metamaskIcon from "@/assets/metamask-icon.svg";
import { useAccount, useConnect } from "wagmi";

export default function ConnectMetamask() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  return (
    <>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="walletAddress">Wallet Address</Label>
          <Input
            type="text"
            className="font-medium"
            id="walletAddress"
            value={address}
            placeholder="Connect your metamask wallet"
            readOnly
          />
        </div>
        <Button
          onClick={() => connect({ connector: connectors[0] })}
          className="self-end"
          variant={"secondary"}
          size={"icon"}
        >
          <img src={metamaskIcon} className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
