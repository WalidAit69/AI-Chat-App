"use client";

import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs";

async function CheckoutButton() {
  const user = await currentUser();

  const createCheckoutSession = () => {
    if(!user) return;

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
