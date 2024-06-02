import DealTable from "./deals/deal-table";
import { WithdrawModal } from "./deals/withdraw-modal";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface DealsProps {
  providerId: string | null | undefined;
}

export default function Deals(props: DealsProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Deals</h1>
        <div className="flex gap-2"><Button onClick={() => {
          navigate('/analytics')
        }} variant={'secondary'}>View Analytics</Button><WithdrawModal /></div>
      </div>
      <DealTable providerId={props.providerId} />
    </div>
  );
}
