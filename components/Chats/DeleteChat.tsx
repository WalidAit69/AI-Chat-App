"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAdminId from "@/hooks/useAdminId";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";
import LoadingSpinner from "../LoadingSpinner";

function DeleteChat({ chatId }: { chatId: string }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const [loading, setloading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    toast({
      title: "Deleting chat",
      description: "Please wait while we delete the chat...",
      variant: "destructive",
    });

    setloading(true);

    if (session?.user.id === adminId) {
      await fetch("/api/chat/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId }),
      })
        .then(() => {
          toast({
            title: "Chat Deleted",
            description: "The chat has been deleted",
            className: "bg-green-600 text-white",
            duration: 3000,
          });
          router.replace("/chat");
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Error",
            description: "Whoops... there was an error deleting the chat",
            variant: "destructive",
          });
        })
        .finally(() => {
          setloading(false);
          setOpen(false);
        });
    } else {
      toast({
        title: "Error",
        description: "You are not authorized to delete this chat",
        variant: "destructive",
      });
    }
  }

  return (
    session?.user.id === adminId && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"destructive"} className="w-[70%] sm:w-auto">
              Delete Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Are you sure ?</DialogTitle>
              <DialogDescription>
                This will delete the chat for all users.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 space-x-2">
              <>
                <Button
                  variant={"destructive"}
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Delete"}
                </Button>

                <Button
                  variant={"outline"}
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  );
}

export default DeleteChat;
