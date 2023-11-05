"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import LoadingSpinner from "../LoadingSpinner";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";
import { useToast } from "../ui/use-toast";

function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setloading] = useState(false);

  const subscription = useSubscriptionStore((state) => state.subscription);
  const isLoadingSubscription = subscription === undefined;
  const isSubscribed = subscription?.status === "active";

  const {toast} = useToast();

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    // push a doc to firebase
    setloading(true);

    const docref = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1O8LqkLByxrekDb1Jxck0i3P",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    // stripe extension on firebase will create a checkout session
    return onSnapshot(docref, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant:"destructive"
        });
        setloading(false);

      }

      if (url) {
        window.location.assign(url);
        setloading(false);
      }
    });

    // redirect user to checkout page
  };

  return (
    // {"if subscribed ... else ..."}

    <div className="mt-10 flex flex-col space-y-2">

      {isSubscribed && (
        <>
        <hr className="mt-5"/>
        <p className="pt-5 text-center text-xs text-indigo-600">
          You are subscribed to PRO
        </p>
        </>
      )}

      <div>
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <div className="flex justify-center">
          <LoadingSpinner dark={true}/>
          </div>
        ) : (
          <Button
            onClick={() => createCheckoutSession()}
            className="w-full dark:bg-black dark:text-white"
          >
            {session ? "Go Pro" : "Sign up"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CheckoutButton;
