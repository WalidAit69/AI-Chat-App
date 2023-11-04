"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useSubscriptionStore } from "@/store/store";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef } from "@/lib/converters/ChatMembers";
import LoadingSpinner from "../LoadingSpinner";
const { v4: uuidv4 } = require("uuid");

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const [loading, setloading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setloading(true);
    toast({
      title: "Creating new chat",
      description: "Hold tight while we create your new chat...",
      duration: 3000,
    });

    // TODO:check subscription and add limits

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    }).then(() => {
      toast({
        title: "success",
        description: "Your chat has been created!",
        duration: 2000,
        className:"bg-green-600 text-white"
      });
      router.push(`/chat/${chatId}`);
    }).catch((error) =>{
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error creating your chat!",
        variant:"destructive"
      });
    }).finally(() =>{
      setloading(false);
    })

  };

  return (
    <Button variant={"ghost"} onClick={createNewChat}>
      {loading ? <LoadingSpinner/> :<MessageSquarePlus />}
    </Button>
  );
}

export default CreateChatButton;
