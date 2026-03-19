export const VIP_WEEKLY_AMOUNT = 150;
export const PAY_AFTER_RATE = 0.3;

export type PaymentType = "vip_weekly" | "pay_after";
export type Network = "MTN" | "Telecel" | "AirtelTigo";
export type PaymentStatus = "pending" | "confirmed" | "rejected";

export type CreatePaymentInput = {
  name: string;
  phone: string;
  paymentType: PaymentType;
  network: Network;
  momoReference: string;
  winnings?: number;
};

export type Payment = {
  id: string;
  name: string;
  phone: string;
  paymentType: PaymentType;
  amount: number;
  network: Network;
  momoReference: string;
  paymentMethod: "manual_momo";
  status: PaymentStatus;
  winnings: number | null;
  createdAt: Date;
};

declare global {
  // eslint-disable-next-line no-var
  var __zx_payments: Payment[] | undefined;
}

function store(): Payment[] {
  if (!globalThis.__zx_payments) globalThis.__zx_payments = [];
  return globalThis.__zx_payments;
}

function calculateAmount(paymentType: PaymentType, winnings?: number): { amount: number; winnings?: number } {
  if (paymentType === "vip_weekly") return { amount: VIP_WEEKLY_AMOUNT };
  if (paymentType === "pay_after") {
    if (!winnings || winnings <= 0) throw new Error("Winnings amount is required for Pay After Winning.");
    return { amount: parseFloat((winnings * PAY_AFTER_RATE).toFixed(2)), winnings };
  }
  throw new Error("Invalid payment type.");
}

function validateInput(input: CreatePaymentInput) {
  if (!input.name?.trim()) throw new Error("Name is required.");
  if (!input.phone?.trim()) throw new Error("Phone is required.");
  if (!input.paymentType) throw new Error("Payment type is required.");
  if (!/^\d{10}$/.test(input.phone.trim())) throw new Error("Phone must be a 10-digit number.");
  if (!["MTN", "Telecel", "AirtelTigo"].includes(input.network)) throw new Error("Invalid network.");
  if (!input.momoReference?.trim()) throw new Error("MoMo reference is required.");
}

export async function createPayment(input: CreatePaymentInput): Promise<Payment> {
  validateInput(input);
  const { amount, winnings } = calculateAmount(input.paymentType, input.winnings);

  const existing = store().find((p) => p.momoReference === input.momoReference.trim());
  if (existing) throw new Error("This MoMo reference has already been submitted.");

  const payment: Payment = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: input.name.trim(),
    phone: input.phone.trim(),
    paymentType: input.paymentType,
    amount,
    network: input.network,
    momoReference: input.momoReference.trim(),
    paymentMethod: "manual_momo",
    status: "pending",
    winnings: winnings ?? null,
    createdAt: new Date(),
  };

  store().unshift(payment);
  return payment;
}

export async function getAllPayments(): Promise<Payment[]> {
  return store();
}

export async function updatePaymentStatus(id: string, status: PaymentStatus): Promise<Payment> {
  if (!["confirmed", "rejected"].includes(status)) throw new Error("Status must be confirmed or rejected.");
  const idx = store().findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Payment not found.");
  store()[idx] = { ...store()[idx], status };
  return store()[idx];
}

