import { ColumnDef } from "@tanstack/react-table";
import { Deal } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useWithdrawAmountStore } from "@/hooks/useStore";

export const columns: ColumnDef<Deal>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-right">ID</div>,
    cell: ({ row }) => {
      const { withdrawAmount, setWithdrawAmount } = useWithdrawAmountStore();
      return (
        <>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              const storageFee = parseFloat(row.getValue("storageFee"));
              if (value) {
                setWithdrawAmount(withdrawAmount + storageFee);
              } else {
                setWithdrawAmount(withdrawAmount - storageFee);
              }
            }}
            aria-label="Select row"
            disabled={row.getValue("status") === "success"}
            className="mr-4"
          />
          {row.getValue("id")}
        </>
      );
    },
  },
  {
    accessorKey: "startEpoch",
    header: "Start Epoch",
  },
  {
    accessorKey: "endEpoch",
    header: "End Epoch",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "pieceSize",
    header: "Piece Size",
  },
  {
    accessorKey: "storageFee",
    header: "Storage Fee",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("storageFee"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return formatted;
    },
  }
];
