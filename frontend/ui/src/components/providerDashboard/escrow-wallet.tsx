import { Input } from "@/components/ui/input";

interface EscrowWalletProps {
  escrowWallet: string | null;
}

export default function EscrowWallet(props: EscrowWalletProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Escrow Wallet</h1>
      <Input
        type="text"
        placeholder="escrow wallet id"
        value={props.escrowWallet || ""}
      />
    </div>
  );
}
