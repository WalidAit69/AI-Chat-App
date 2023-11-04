"use client"

import { useSubscriptionStore } from "@/store/store"
import { useRouter } from "next/navigation"


function ProBanner() {

  const subscription = useSubscriptionStore(
    (state) => state.subscription
  )

  const isPro = subscription?.status === "active"
  const router = useRouter();

  if(subscription === undefined || isPro) return null;
  
  return (
    <div className='w-full bg-black text-white text-center py-2'>
        Upgrade to Pro to unlock all features!
    </div>
  )
}

export default ProBanner