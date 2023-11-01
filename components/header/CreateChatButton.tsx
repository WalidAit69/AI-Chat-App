"use client"

import React from "react";
import { Button } from "../ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";

function CreateChatButton() {
  const router = useRouter();
  const createNewChat = () => {};

  return (
    <Button variant={"ghost"} onClick={createNewChat}>
      <MessageSquarePlus />
    </Button>
  );
}

export default CreateChatButton;
