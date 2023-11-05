"use client";

import { useSubscriptionStore } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProBanner() {
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isPro = subscription?.status === "active";
  const router = useRouter();

  if (subscription === undefined || isPro) return null;

  return (
    <Link href={'/register'} className="relative cursor-pointer">
      <div className="w-full bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] blur-[2px] text-center h-10"></div>
      <h1 className="text-white font-medium text-sm sm:text-base absolute inset-2 animate-pulse flex justify-center">
        Upgrade to Pro to unlock all features!
      </h1>
    </Link>
  );
}

export default ProBanner;
