import { generatePortalLink } from "@/actions/generatePortalLink";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const portalLink = await generatePortalLink();

    if (portalLink) {
      return new NextResponse(portalLink!);
    } else {
      return new NextResponse(null, {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error generating Stripe Portal link:", error);
    return new NextResponse("error", {
      status: 404,
    });
  }
}
