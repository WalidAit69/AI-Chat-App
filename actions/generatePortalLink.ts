"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { adminDb } from "@/firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function generatePortalLink() {
  const session = await getServerSession(authOptions);
  const host = "https://ai-chat-app-six.vercel.app/register";

  if (!session?.user.id) return console.error("No User Id Found");

  const {
    user: { id },
  } = session;

  const returnUrl = host;

  const doc = await adminDb.collection("customers").doc(id).get();

  if (!doc.data) return console.error("No Customer Found with userId: ", id);

  const stripeId = doc.data()!.stripeId;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl,
  });

  return stripeSession.url;
}
