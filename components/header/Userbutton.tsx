import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function Userbutton({ user }: { user: any | null }) {
  // subscription listener
  if (!user) {
    return (
      <Link href={"/sign-in"}>
        <Button variant={"outline"}> Sign in </Button>
      </Link>
    );
  }

  return <UserButton afterSignOutUrl="/" />;
}

export default Userbutton;
