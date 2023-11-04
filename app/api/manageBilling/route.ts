import { NextApiRequest, NextApiResponse } from 'next';
import { generatePortalLink } from '@/actions/generatePortalLink';
import { NextResponse } from "next/server";


export async function GET(res: Response) {
    try {
      const portalLink = await generatePortalLink();
      return new NextResponse(portalLink!);
    } catch (error) {
      console.error('Error generating Stripe Portal link:', error);
    }
}
