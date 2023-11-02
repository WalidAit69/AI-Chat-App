"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

function CheckoutButton() {

  const { data: session } = useSession();

  const createCheckoutSession = () => {
    if (!session) return;

    // push a doc to firebase

    // stripe extension on firebase will create a checkout session

    // redirect user to checkout page
  };

  return (
    // {"if subscribed ... else ..."}

    <div className="mt-10 flex flex-col space-y-2">
      <Button
        className="w-full dark:bg-black dark:text-white"
        onClick={() => createCheckoutSession()}
      >
        CheckoutButton
      </Button>
    </div>
  );
}

export default CheckoutButton;
