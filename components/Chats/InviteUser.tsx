"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { Input } from "../ui/input";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "../ui/toast";
import { getUserByEmailRef } from "@/lib/converters/User";
import ShareLink from "./ShareLink";
import LoadingSpinner from "../LoadingSpinner";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function InviteUser({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInviteLink, setopenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setloading(true);

    if (!session?.user.id) return;

    toast({
      title: "Inviting user...",
      description: "Please wait while we send the invite...",
    });

    const UsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    );

    const isPro = subscription?.status === "active";

    if (!isPro && UsersInChat.length >= 2) {
      toast({
        title: "You can't invite more than 2 users",
        description:
          "Free plan limit reached Please upgrade to a pro subscription to invite more users",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      form.reset();
      setloading(false);
      setOpen(false);


      return;
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));

    const user = querySnapshot?.docs[0]?.data();

    try {
      setloading(true);
      if (querySnapshot.empty) {
        toast({
          title: "User not found",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      } else if (user.id === session.user.id) {
        toast({
          title: "User Already in chat",
          description: "Please invite a new user",
          variant: "destructive",
        });
        return;
      } else {
        let userFound = false;

        UsersInChat.forEach((users) => {
          if (user.id === users.userId) {
            toast({
              title: "User not found",
              description: "Please enter a valid email address",
              variant: "destructive",
            });
            userFound = true;
            return;
          }
        });

        if (userFound) {
          toast({
            title: "User Already in chat",
            description: "Please invite a new user",
            variant: "destructive",
          });

          return;
        }

        await setDoc(addChatRef(chatId, user.id), {
          userId: user.id!,
          email: user.email!,
          timestamp: serverTimestamp(),
          chatId: chatId,
          isAdmin: false,
          image: user.image || "",
        })
          .then(() => {
            setOpen(false);

            toast({
              title: "User Added to chat",
              description: "The user has been invited to the chat",
              className: "bg-green-600 text-white",
              duration: 3000,
            });

            setopenInviteLink(true);
          })
          .catch(() => {
            toast({
              title: "Error",
              description: "Whoops... there was an error adding the user",
              variant: "destructive",
            });

            setOpen(false);
          });
      }

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-[70%] sm:w-auto">
              <PlusCircleIcon className="mr-1 capitalize" />
              Invite your friends
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a friend to chat</DialogTitle>
              <DialogDescription>
                Simply enter your friend email address to invite them to this
                chat!{""}
                <span className="text-indigo-600 font-bold">
                  (Note: they must be registered)
                </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="john@goe.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="ml-auto sm:w-36 w-full" type="submit" disabled={loading}>
                  {loading ? <LoadingSpinner dark /> : "Add To Chat"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setopenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
}

export default InviteUser;
