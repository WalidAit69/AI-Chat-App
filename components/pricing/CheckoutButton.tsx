"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

function CheckoutButton() {

  const { data: session } = useSession();
  const [loading, setloading] = useState(false);

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    // push a doc to firebase
    setloading(true);

    const docref = await addDoc(
      collection(db, "customers" , session.user.id , 'checkout_sessions'),{
      price:"price_1O8LqkLByxrekDb1Jxck0i3P",
      success_url:window.location.origin,
      cancel_url:window.location.origin,
    });

    // stripe extension on firebase will create a checkout session
    return onSnapshot(docref , snap =>{
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if(error){
        alert(`An error occured ${error.message}`);
        setloading(false)
      }

      if(url){
        window.location.assign(url);
        setloading(false)
      }
    })

    // redirect user to checkout page
  };

  return (
    // {"if subscribed ... else ..."}

    <div className="mt-10 flex flex-col space-y-2">
      <Button
        className="w-full dark:bg-black dark:text-white"
        onClick={() => createCheckoutSession()}
      >
        {loading ? "Loading..." : (session ? "Go Pro" : "Sign up")}
      </Button>
    </div>
  );
}

export default CheckoutButton;
