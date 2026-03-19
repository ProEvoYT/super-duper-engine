"use client";

import { useState, useEffect } from "react";

type PaymentType = "vip_weekly" | "pay_after" | null;
type Network = "MTN" | "Telecel" | "AirtelTigo" | "";

const MOMO_NUMBERS = {
  MTN: "055 000 0000",
  Telecel: "020 000 0000",
  AirtelTigo: "026 000 0000",
};

export default function PaymentPage() {
  const [paymentType, setPaymentType] = useState<PaymentType>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    network: "" as Network,
    momoReference: "",
    winnings: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedRef, setSubmittedRef] = useState("");
  const [showErrorBanner, setShowErrorBanner] = useState(false);

  const vipAmount = 150;
  const winningsNum = parseFloat(form.winnings) || 0;
  const payAfterAmount = winningsNum > 0 ? (winningsNum * 0.3).toFixed(2) : "0.00";

  const displayAmount =
    paymentType === "vip_weekly"
      ? `GHS ${vipAmount}.00`
      : paymentType === "pay_after" && winningsNum > 0
      ? `GHS ${payAfterAmount}`
      : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShowErrorBanner(false);
    setLoading(true);

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          paymentType,
          network: form.network,
          momoReference: form.momoReference,
          winnings: form.winnings ? parseFloat(form.winnings) : undefined,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        const rawMessage = typeof data.error === "string" ? data.error : "Submission failed.";

        let friendly = rawMessage;
        if (rawMessage.includes("10-digit")) {
          friendly = "Please enter a valid 10-digit Ghanaian phone number.";
        } else if (rawMessage.includes("Invalid network")) {
          friendly = "Please select a valid mobile network.";
        } else if (rawMessage.includes("already been submitted")) {
          friendly = "This MoMo reference has already been recorded. Check your SMS and try again.";
        } else if (rawMessage.includes("Winnings amount is required")) {
          friendly = "Enter your winnings amount to calculate the Pay After Winning fee.";
        } else if (rawMessage.includes("Payment type is required")) {
          friendly = "Choose a payment plan before submitting.";
        }

        throw new Error(friendly);
      }

      setSubmittedRef(data.payment.momoReference);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed.");
      setShowErrorBanner(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (showErrorBanner) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showErrorBanner]);

  function reset() {
    setSuccess(false);
    setPaymentType(null);
    setForm({ name: "", phone: "", network: "", momoReference: "", winnings: "" });
    setError("");
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-display text-3xl text-[#C9A84C] mb-3">Submitted</h2>
          <p className="text-[#888] text-sm mb-2 font-mono">Reference recorded</p>
          <p className="font-mono text-[#F5F2ED] bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-3 text-sm mb-6 inline-block">
            {submittedRef}
          </p>
          <p className="text-[#666] text-xs mb-8 leading-relaxed">
            Your payment is pending verification. You will be notified once confirmed by an admin.
          </p>
          <button onClick={reset} className="btn-gold">
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-lg mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#C9A84C] flex items-center justify-center">
              <span className="text-black font-mono text-xs font-bold">ZX</span>
            </div>
            <span className="font-mono text-xs text-[#666] uppercase tracking-widest">
              Zero Studio.X
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[#F5F2ED] leading-tight mb-3">
            Payment
            <br />
            <span className="text-[#C9A84C]">Portal</span>
          </h1>
          <p className="text-[#555] text-sm font-mono">
            Manual MoMo payment submission system
          </p>
        </div>

        {error && showErrorBanner && (
          <div className="mt-6 border border-red-900/50 bg-red-900/10 px-4 py-3">
            <p className="text-red-400 text-xs font-mono">{error}</p>
          </div>
        )}

        {!paymentType && (
          <div className="space-y-4">
            <p className="label">Select payment plan</p>

            <button
              onClick={() => setPaymentType("vip_weekly")}
              className="w-full text-left card border-[#222] hover:border-[#C9A84C] transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-xl text-[#F5F2ED] mb-1 group-hover:text-[#C9A84C] transition-colors">
                    VIP Weekly
                  </p>
                  <p className="text-[#555] text-xs font-mono">
                    Fixed weekly access pass
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[#C9A84C] text-xl font-semibold">
                    150
                  </p>
                  <p className="text-[#555] text-xs font-mono">GHS</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentType("pay_after")}
              className="w-full text-left card border-[#222] hover:border-[#C9A84C] transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-xl text-[#F5F2ED] mb-1 group-hover:text-[#C9A84C] transition-colors">
                    Pay After Winning
                  </p>
                  <p className="text-[#555] text-xs font-mono">
                    30% of your winnings
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[#C9A84C] text-xl font-semibold">
                    30%
                  </p>
                  <p className="text-[#555] text-xs font-mono">of wins</p>
                </div>
              </div>
            </button>

            <p className="text-[#444] text-xs font-mono text-center pt-4">
              All payments via Mobile Money (MTN · Telecel · AirtelTigo)
            </p>
          </div>
        )}

        {paymentType && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setPaymentType(null)}
                className="text-[#555] text-xs font-mono hover:text-[#888] transition-colors flex items-center gap-2"
              >
                ← Back
              </button>
              <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest">
                {paymentType === "vip_weekly" ? "VIP Weekly · GHS 150" : "Pay After Winning · 30%"}
              </span>
            </div>

            {paymentType === "pay_after" && (
              <div>
                <label className="label">Your winnings (GHS)</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="e.g. 500.00"
                  value={form.winnings}
                  onChange={(e) => setForm({ ...form, winnings: e.target.value })}
                  className="input-field"
                  required
                />
                {winningsNum > 0 && (
                  <p className="font-mono text-xs text-[#C9A84C] mt-2">
                    Amount due: GHS {payAfterAmount}
                  </p>
                )}
              </div>
            )}

            <div className="border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-4 space-y-3">
              <p className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest mb-3">
                Send payment to:
              </p>
              {Object.entries(MOMO_NUMBERS).map(([net, num]) => (
                <div key={net} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#888]">{net}</span>
                  <span className="font-mono text-sm text-[#F5F2ED]">{num}</span>
                </div>
              ))}
              {displayAmount && (
                <div className="border-t border-[#C9A84C]/20 pt-3 mt-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#888]">Amount</span>
                  <span className="font-mono text-base text-[#C9A84C] font-semibold">
                    {displayAmount}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="label">Full name</label>
              <input
                type="text"
                placeholder="John Mensah"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Phone number</label>
              <input
                type="tel"
                placeholder="0551234567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
                required
                maxLength={10}
              />
            </div>

            <div>
              <label className="label">Mobile network</label>
              <select
                value={form.network}
                onChange={(e) => setForm({ ...form, network: e.target.value as Network })}
                className="input-field"
                required
              >
                <option value="">Select network</option>
                <option value="MTN">MTN</option>
                <option value="Telecel">Telecel</option>
                <option value="AirtelTigo">AirtelTigo</option>
              </select>
            </div>

            <div>
              <label className="label">MoMo reference / Transaction ID</label>
              <input
                type="text"
                placeholder="e.g. 1234567890"
                value={form.momoReference}
                onChange={(e) => setForm({ ...form, momoReference: e.target.value })}
                className="input-field"
                required
              />
              <p className="text-[#444] text-xs font-mono mt-1">
                Found in your MoMo transaction SMS
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full">
              {loading ? "Submitting..." : "Submit Payment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

