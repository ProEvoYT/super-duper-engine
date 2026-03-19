"use client";

import React, { useEffect, useState } from "react";
import type { PaymentStatus } from "@/lib/payments";

type Payment = {
  id: string;
  name: string;
  phone: string;
  paymentType: "vip_weekly" | "pay_after";
  amount: number;
  network: "MTN" | "Telecel" | "AirtelTigo";
  momoReference: string;
  status: PaymentStatus;
  createdAt: string;
  winnings?: number;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  confirmed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  rejected: "text-red-400 bg-red-400/10 border-red-400/30",
};

export default function AdminPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "rejected">("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");

  async function fetchPayments() {
    const res = await fetch("/api/payments");
    const data = await res.json();
    if (data.success) setPayments(data.payments);
    setLoading(false);
  }

  useEffect(() => {
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
    if (!adminKey) {
      setAuthorized(true);
      return;
    }

    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("zx_admin_key");
    if (stored && stored === adminKey) {
      setAuthorized(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (authorized) {
      fetchPayments();
    }
  }, [authorized]);

  async function updateStatus(id: string, status: Extract<PaymentStatus, "confirmed" | "rejected">) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setPayments((prev: Payment[]) =>
          prev.map((p: Payment) => (p.id === id ? { ...p, status } : p))
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  const filtered = filter === "all" ? payments : payments.filter((p) => p.status === filter);
  const counts = {
    all: payments.length,
    pending: payments.filter((p) => p.status === "pending").length,
    confirmed: payments.filter((p) => p.status === "confirmed").length,
    rejected: payments.filter((p) => p.status === "rejected").length,
  };

  if (!authorized) {
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;

    return (
      <div className="min-h-screen px-4 py-12 flex items-center justify-center">
        <div className="max-w-sm w-full card">
          <h1 className="font-display text-2xl text-[#F5F2ED] mb-4">Admin Access</h1>
          {adminKey ? (
            <>
              <p className="font-mono text-xs text-[#777] mb-4">
                Enter the admin key to view the dashboard.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setAuthError("");
                  const formData = new FormData(e.currentTarget);
                  const value = String(formData.get("key") ?? "");
                  if (value === adminKey) {
                    if (typeof window !== "undefined") {
                      window.localStorage.setItem("zx_admin_key", value);
                    }
                    setAuthorized(true);
                  } else {
                    setAuthError("Invalid admin key.");
                  }
                }}
              >
                <div>
                  <label className="label">Admin key</label>
                  <input
                    name="key"
                    type="password"
                    className="input-field"
                    placeholder="Enter admin key"
                    autoComplete="off"
                  />
                </div>
                {authError && (
                  <p className="font-mono text-xs text-red-400">{authError}</p>
                )}
                <button type="submit" className="btn-gold w-full">
                  Continue
                </button>
              </form>
            </>
          ) : (
            <p className="font-mono text-xs text-[#777]">
              Set <span className="text-[#C9A84C]">NEXT_PUBLIC_ADMIN_KEY</span> to require a key for this page.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#C9A84C] flex items-center justify-center">
                <span className="text-black font-mono text-xs font-bold">ZX</span>
              </div>
              <span className="font-mono text-xs text-[#666] uppercase tracking-widest">
                Zero Studio.X / Admin
              </span>
            </div>
            <h1 className="font-display text-4xl text-[#F5F2ED]">
              Payment <span className="text-[#C9A84C]">Dashboard</span>
            </h1>
          </div>
          <a
            href="/payment"
            className="font-mono text-xs text-[#555] hover:text-[#888] transition-colors mt-2"
          >
            ← Payment Page
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {(["all", "pending", "confirmed", "rejected"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`card text-left transition-all duration-200 ${
                filter === key ? "border-[#C9A84C]" : "border-[#222] hover:border-[#333]"
              }`}
            >
              <p className="font-mono text-2xl text-[#F5F2ED] mb-1">{counts[key]}</p>
              <p className="font-mono text-xs text-[#555] uppercase tracking-widest">{key}</p>
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="card flex items-center justify-center py-16">
            <p className="font-mono text-xs text-[#555] uppercase tracking-widest">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card flex items-center justify-center py-16">
            <p className="font-mono text-xs text-[#555]">No payments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#222]">
                  {["Name", "Phone", "Type", "Amount", "Network", "Reference", "Status", "Date", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-3 font-mono text-xs text-[#555] uppercase tracking-widest whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[#1A1A1A] hover:bg-[#111] transition-colors"
                  >
                    <td className="py-4 px-3 font-mono text-sm text-[#F5F2ED]">{p.name}</td>
                    <td className="py-4 px-3 font-mono text-sm text-[#888]">{p.phone}</td>
                    <td className="py-4 px-3">
                      <span className="font-mono text-xs text-[#666] uppercase tracking-wide">
                        {p.paymentType === "vip_weekly" ? "VIP" : "PAW"}
                      </span>
                    </td>
                    <td className="py-4 px-3 font-mono text-sm text-[#C9A84C] font-semibold whitespace-nowrap">
                      GHS {p.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-3 font-mono text-xs text-[#666]">{p.network}</td>
                    <td className="py-4 px-3 font-mono text-xs text-[#888] max-w-[120px] truncate">
                      {p.momoReference}
                    </td>
                    <td className="py-4 px-3">
                      <span
                        className={`font-mono text-xs px-2 py-1 border ${STATUS_STYLES[p.status] ?? ""}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 font-mono text-xs text-[#555] whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPayment(p)}
                          className="font-mono text-xs px-3 py-1 border border-[#333] text-[#888] hover:bg-[#111] transition-colors"
                        >
                          View
                        </button>
                        {p.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(p.id, "confirmed")}
                              disabled={updating === p.id}
                              className="font-mono text-xs px-3 py-1 bg-emerald-900/40 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/70 transition-colors disabled:opacity-50"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => updateStatus(p.id, "rejected")}
                              disabled={updating === p.id}
                              className="font-mono text-xs px-3 py-1 bg-red-900/40 text-red-400 border border-red-800 hover:bg-red-900/70 transition-colors disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="font-mono text-xs text-[#444]">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Detail Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="card max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-[#F5F2ED]">Payment Details</h2>
                <button
                  type="button"
                  onClick={() => setSelectedPayment(null)}
                  className="font-mono text-xs text-[#777] hover:text-[#aaa]"
                >
                  Close
                </button>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between gap-4">
                  <span className="text-[#666]">Name</span>
                  <span className="text-[#F5F2ED] text-right">{selectedPayment.name}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666]">Phone</span>
                  <span className="text-[#F5F2ED] text-right">{selectedPayment.phone}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666]">Type</span>
                  <span className="text-[#F5F2ED] text-right">
                    {selectedPayment.paymentType === "vip_weekly" ? "VIP Weekly" : "Pay After Winning"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666]">Amount</span>
                  <span className="text-[#C9A84C] text-right">
                    GHS {selectedPayment.amount.toFixed(2)}
                  </span>
                </div>
                {typeof selectedPayment.winnings === "number" && (
                  <div className="flex justify-between gap-4">
                    <span className="text-[#666]">Winnings</span>
                    <span className="text-[#F5F2ED] text-right">
                      GHS {selectedPayment.winnings.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="text-[#666]">Network</span>
                  <span className="text-[#F5F2ED] text-right">{selectedPayment.network}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666]">Reference</span>
                  <span className="text-[#F5F2ED] text-right break-all">
                    {selectedPayment.momoReference}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666]">Status</span>
                  <span className="text-[#F5F2ED] text-right">{selectedPayment.status}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666]">Date</span>
                  <span className="text-[#F5F2ED] text-right">
                    {new Date(selectedPayment.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="font-mono text-xs text-[#333] mt-8 text-center">
          Zero Studio.X · Manual MoMo Payment Tracking · MVP
        </p>
      </div>
    </div>
  );
}
