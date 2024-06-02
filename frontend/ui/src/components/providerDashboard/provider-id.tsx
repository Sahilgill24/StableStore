import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquareWarning, LightbulbIcon } from "lucide-react";

interface ProviderIdProps {
  providerId: string | null | undefined;
  setProviderId: (providerId: string | null) => void;
}

export default function ProviderId(props: ProviderIdProps) {
  const [currentProviderId, setCurrentProviderId] = useState<string | null>(
    null
  );
  const handleProviderIdAction = () => {
    if (props.providerId) {
      navigator.clipboard.writeText(props.providerId);
    } else {
      console.log(currentProviderId)
      props.setProviderId(currentProviderId);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Provider ID</h1>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Provider ID"
          defaultValue={props.providerId || ""}
          readOnly={!!props.providerId}
          onChange={(e) => setCurrentProviderId(e.target.value)}
        />
        <Button onClick={handleProviderIdAction}>
          {props.providerId ? "Copy" : "Set Provider ID"}
        </Button>
      </div>
      {!props.providerId ? (
        <Alert className="mt-4 bg-red-500/60 border-red-50/20  font-semibold text-accent-foreground">
          <MessageSquareWarning className="h-4 w-4" />
          <AlertDescription>
            Please use the provided escrow wallet address when running lotus
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="mt-4 bg-sky-500/10 font-semibold text-muted-foreground">
          <LightbulbIcon className="w-4 h-4" />
          <AlertDescription>
            Provider is not mutable if you want to change please sign up again!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
