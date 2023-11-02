"use client"

import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../UserAvatar";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

function Userbutton({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <Button variant={"outline"} onClick={() => signIn()}>
        {" "}
        Sign in{" "}
      </Button>
    );
  }

  return session && (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={session.user?.name || 'User Name'}
          image={session.user?.image || ''}
          classname=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hi {session.user?.name}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Userbutton;
