import { prisma } from "./prisma";

export const VIP_WEEKLY_AMOUNT = 150;
export const PAY_AFTER_RATE = 0.3;

export type CreatePaymentInput = {
  name: string;
  phone: string;
  paymentType: "vip_weekly" | "pay_after";
  network: string;
  momoReference: string;
  winnings?: number;
};

export type PaymentStatus = "pending" | "confirmed" | "rejected";

function calculateAmount(paymentType: string, winnings?: number) {
  if (paymentType === "vip_weekly") return { amount: VIP_WEEKLY_AMOUNT };
  if (paymentType === "pay_after") {
    if (!winnings || winnings <= 0)
      throw new Error("Winnings amount is required for Pay After Winning.");
    return { amount: parseFloat((winnings * PAY_AFTER_RATE).toFixed(2)), winnings };
  }
  throw new Error("Invalid payment type.");
}

function validateInput(input: CreatePaymentInput) {
  if (!input.name?.trim()) throw new Error("Name is required.");
  if (!input.phone?.trim()) throw new Error("Phone is required.");
  if (!input.paymentType) throw new Error("Payment type is required.");
  if (!/^\d{10}$/.test(input.phone.trim()))
    throw new Error("Phone must be a 10-digit number.");
  if (!["MTN", "Telecel", "AirtelTigo"].includes(input.network))
    throw new Error("Invalid network.");
  if (!input.momoReference?.trim())
    throw new Error("MoMo reference is required.");
}

export async function createPayment(input: CreatePaymentInput) {
  validateInput(input);
  const { amount, winnings } = calculateAmount(input.paymentType, input.winnings);

  const existing = await prisma.payment.findUnique({
    where: { momoReference: input.momoReference.trim() },
  });
  if (existing) throw new Error("This MoMo reference has already been submitted.");

  return prisma.payment.create({
    data: {
      name: input.name.trim(),
      phone: input.phone.trim(),
      paymentType: input.paymentType,
      amount,
      network: input.network,
      momoReference: input.momoReference.trim(),
      paymentMethod: "manual_momo",
      status: "pending",
      winnings: winnings ?? null,
    },
  });
}

export async function getAllPayments() {
  return prisma.payment.findMany({ orderBy: { createdAt: "desc" } });
}

export async function updatePaymentStatus(id: string, status: PaymentStatus) {
  if (!["confirmed", "rejected"].includes(status))
    throw new Error("Status must be confirmed or rejected.");

  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new Error("Payment not found.");

  return prisma.payment.update({ where: { id }, data: { status } });
}