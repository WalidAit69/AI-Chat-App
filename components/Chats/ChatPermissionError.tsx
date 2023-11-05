import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "../ui/button";

function ChatPermissionError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex">
        <p className="flex-1">
          You do not have permission to access this chat.
          <br />
          <span className="font-bold">
            Please contact an admin to request access.
          </span>
        </p>

        <Link href={"/chat"} replace>
          <Button variant={"destructive"}>Dissmiss</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}

export default ChatPermissionError;
