import { NextRequest, NextResponse } from "next/server";
import { createPayment, getAllPayments } from "@/lib/payments";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payment = await createPayment(body);
    return NextResponse.json({ success: true, payment }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const payments = await getAllPayments();
    return NextResponse.json({ success: true, payments });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch payments.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
