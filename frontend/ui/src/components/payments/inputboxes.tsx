import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface InputBoxesProps {
    exchangeAmount: number;
    AKTAmount: number;
    setExchangeAmount: (value: number) => void;
    setAKTAmount: (value: number) => void;
}

const EXCHANGE_RATE_API = import.meta.env.VITE_EXCHANGE_RATE_API
const dataFetch = async () => {
    const res = await axios.get(EXCHANGE_RATE_API)
    const data = await res.data
    return data
}

export default function InputBoxes({ exchangeAmount, setAKTAmount, setExchangeAmount, AKTAmount }: InputBoxesProps) {
    const { toast } = useToast();

    console.log(EXCHANGE_RATE_API)
    const onUSDChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setExchangeAmount(Number(e.target.value))
        if (Number(e.target.value) > 0) {
            const data = await dataFetch()
            const price = data.data.price;
            if (price) {
                setAKTAmount(Number(e.target.value) / price)
            } else {
                toast({
                    title: 'Uh oh!',
                    description: "Unable to fetch data from the API.",
                    variant: 'destructive',
                })
            }
        }
    }

    const onAktChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setAKTAmount(Number(e.target.value))
        if (Number(e.target.value) > 0) {
            const data = await dataFetch()
            const price = data.data.price;
            // 1 
            if (price) {
                setExchangeAmount(Number(e.target.value) * price)
            } else {
                toast({
                    title: 'Uh oh!',
                    description: "Unable to fetch data from the API.",
                    variant: 'destructive',
                })
            }
        }
    }

    return (
        <>
            <div>
                <Label htmlFor="pay-amount">You pay</Label>
                <div className="relative flex items-center rounded-md shadow-sm">
                    <Input
                        className="w-full pr-12  pt-7 pb-7 rounded-md"
                        id="pay-amount"
                        name="pay-amount"
                        type="number"
                        placeholder="0"
                        value={!exchangeAmount ? "" : exchangeAmount}
                        onChange={onUSDChange}
                    />
                    <span className="text-sm -ml-11 font-bold text-muted-foreground">
                        USD
                    </span>
                </div>
            </div>
            <div className="flex justify-center mt-3 rounded-full items-center">
                <ArrowDownUpIcon className="text-gray-500" />
            </div>
            <div className="mb-6">
                <Label htmlFor="receive-amount">You receive</Label>
                <div className="relative flex items-center rounded-md shadow-sm">
                    <Input
                        className="w-full pr-12 pt-7 pb-7 rounded-md"
                        id="pay-amount"
                        name="pay-amount"
                        type="number"
                        placeholder="0"
                        value={!AKTAmount ? "" : AKTAmount}
                        onChange={onAktChange}
                    />
                    <span className="-ml-11 font-bold rounded-md text-sm text-muted-foreground">
                        AKT
                    </span>
                </div>
            </div>
        </>
    )
}


function ArrowDownUpIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
        </svg>
    );
}
