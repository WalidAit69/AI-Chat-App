"use client";

import { CheckIcon } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

function PricingCards({ redirect }: { redirect: boolean }) {

  return (
    <div>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl
            ring-1 ring-gray-900/10 sm:p-10"
          >
            <div>
              <h3
                id={tier.id + tier.name}
                className="text-base font-semibold leading-7 text-indigo-600"
              >
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-x-2">
                {tier.priceMonthly ? (
                  <>
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {tier.priceMonthly}
                    </span>
                    <span className="text-base font-semibold leading-7 text-gray-600">
                      /month
                    </span>
                  </>
                ) : (
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    Free
                  </span>
                )}
              </div>

              <p className="mt-6 text-base leading-7 text-gray-600">
                {tier.description}
              </p>
              <ul
                role="list"
                className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {redirect ? (
              <Link href={"/register"} className="mt-10">
                <Button
                  variant={"default"}
                  className="w-full"
                >
                  Get Started Today
                </Button>
              </Link>
            ) : (
              tier.id && <CheckoutButton />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const tiers = [
  {
    name: "Starter",
    id: null,
    priceMonthly: null,
    description: "Start chatting right away with anyone, anywhere",
    features: [
      "20 Messages Chat Limit in Chats",
      "2 Participant limit in Chats",
      "3 Chat Rooms limit",
      "Support 2 languages",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    priceMonthly: "$19.99",
    description: "Unlock the full Potential with Pro!",
    features: [
      "Unlimited Messages in Chats",
      "Unlimited Participants in Chats",
      "Unlimited Chat Rooms",
      "Support up to 10 languages",
      "24-hour support response time",
      "Multimedia support in chats (coming soon)",
      "Early access to New Features",
    ],
  },
];

export default PricingCards;
