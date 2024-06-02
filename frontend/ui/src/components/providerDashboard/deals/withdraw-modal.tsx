import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWithdrawAmountStore } from "@/hooks/useStore";
import ConnectMetamask from "./connect-metamask";
import Metadata from "./metadata";
import { useToast } from "@/components/ui/use-toast";

export function WithdrawModal() {
  const { withdrawAmount } = useWithdrawAmountStore();
  const { toast } = useToast();
  const handleWithdraw = () => {
    setTimeout(() => {
      toast({
        title: "Withdrawal successful",
        description: "https://calibration.filfox.info/en/message/0xcf6b2f3606d2127b332a38ffbdac9f373a388ad33047f96de4bac26ba635b201?t=1",
      })
    }, 1000)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Withdraw</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw deals</DialogTitle>
          <DialogDescription className="font-medium">Withdraw deals to your account</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="usdc">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="usdc">Accept USDC</TabsTrigger>
            <TabsTrigger value="fil">Accept FIL</TabsTrigger>
          </TabsList>
          <TabsContent value="usdc">
            <ConnectMetamask />
            <Metadata amountInUsd={withdrawAmount} toCurrency="usdc" />
            <Button onClick={handleWithdraw}>Withdraw</Button>
          </TabsContent>
          
          <TabsContent value="fil">
            <ConnectMetamask />
            <Metadata amountInUsd={withdrawAmount} toCurrency="fil" />
            <Button onClick={handleWithdraw}>Withdraw</Button>
          </TabsContent>
        </Tabs>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
