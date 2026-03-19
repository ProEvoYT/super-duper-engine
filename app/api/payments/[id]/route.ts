import { NextRequest, NextResponse } from "next/server";
import { updatePaymentStatus, PaymentStatus } from "@/lib/payments";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    const payment = await updatePaymentStatus(params.id, status as PaymentStatus);
    return NextResponse.json({ success: true, payment });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

