"use client";

import { useEffect } from "react";

export default function PreviewScript() {
  useEffect(() => {
    const payments = [
      { id: 1, name: "Kwame Asante", phone: "0551234567", type: "vip_weekly", amount: 150, network: "MTN", ref: "TX-2024-00841", status: "confirmed", date: "12 Mar 2025" },
      { id: 2, name: "Ama Owusu", phone: "0201234567", type: "pay_after", amount: 87, network: "Telecel", ref: "TX-2024-00842", status: "pending", date: "13 Mar 2025" },
      { id: 3, name: "Kofi Mensah", phone: "0261234567", type: "vip_weekly", amount: 150, network: "AirtelTigo", ref: "TX-2024-00843", status: "rejected", date: "14 Mar 2025" },
      { id: 4, name: "Abena Frimpong", phone: "0551234568", type: "pay_after", amount: 120, network: "MTN", ref: "TX-2024-00844", status: "confirmed", date: "15 Mar 2025" },
      { id: 5, name: "Yaw Boateng", phone: "0201234568", type: "vip_weekly", amount: 150, network: "Telecel", ref: "TX-2024-00845", status: "pending", date: "16 Mar 2025" },
      { id: 6, name: "Efua Darko", phone: "0261234568", type: "pay_after", amount: 45, network: "AirtelTigo", ref: "TX-2024-00846", status: "pending", date: "17 Mar 2025" },
    ];

    let currentFilter = "all";
    let currentPlan = "vip";

    function renderAdminTable(filter: string) {
      const tbody = document.getElementById("admin-tbody");
      if (!tbody) return;

      const filtered = filter === "all" ? payments : payments.filter((p) => p.status === filter);
      tbody.innerHTML = filtered
        .map(
          (p) => `
    <tr id="row-${p.id}">
      <td>${p.name}</td>
      <td class="muted">${p.phone}</td>
      <td><span style="font-size:10px;color:#555;text-transform:uppercase;">${p.type === "vip_weekly" ? "VIP" : "PAW"}</span></td>
      <td class="amount-cell">GHS ${p.amount}.00</td>
      <td class="muted">${p.network}</td>
      <td class="muted" style="font-size:11px;">${p.ref}</td>
      <td><span class="badge badge-${p.status}" id="badge-${p.id}">${p.status}</span></td>
      <td class="muted" style="font-size:11px;">${p.date}</td>
      <td id="actions-${p.id}">
        ${
          p.status === "pending"
            ? `
          <button class="btn-confirm" onclick="updateStatus(${p.id},'confirmed')">Confirm</button>
          <button class="btn-reject" onclick="updateStatus(${p.id},'rejected')">Reject</button>
        `
            : '<span style="color:#333;font-size:12px;">—</span>'
        }
      </td>
    </tr>
  `
        )
        .join("");
    }

    function showTab(tab: string) {
      const viewPayment = document.getElementById("view-payment");
      const viewAdmin = document.getElementById("view-admin");
      if (!viewPayment || !viewAdmin) return;

      viewPayment.style.display = tab === "payment" ? "block" : "none";
      viewAdmin.style.display = tab === "admin" ? "block" : "none";

      document.querySelectorAll(".tab").forEach((t, i) => {
        t.classList.toggle("active", (i === 0 && tab === "payment") || (i === 1 && tab === "admin"));
      });

      if (tab === "admin") renderAdminTable("all");
    }

    function selectPlan(plan: string) {
      currentPlan = plan;

      const planSelect = document.getElementById("plan-select");
      const paymentForm = document.getElementById("payment-form");
      if (!planSelect || !paymentForm) return;

      planSelect.style.display = "none";
      paymentForm.style.display = "block";

      const badge = document.getElementById("plan-badge");
      const wf = document.getElementById("winnings-field");
      if (!badge || !wf) return;

      if (plan === "vip") {
        badge.textContent = "VIP Weekly · GHS 150";
        wf.style.display = "none";
        const momoAmt = document.getElementById("momo-amt-val");
        if (momoAmt) momoAmt.textContent = "GHS 150.00";
      } else {
        badge.textContent = "Pay After Winning · 30%";
        wf.style.display = "block";
        const momoAmt = document.getElementById("momo-amt-val");
        if (momoAmt) momoAmt.textContent = "GHS 0.00";
      }
    }

    function updateAmount() {
      const input = document.getElementById("winnings-input") as HTMLInputElement | null;
      const amountDue = document.getElementById("amount-due");
      const momoAmt = document.getElementById("momo-amt-val");
      if (!input || !amountDue || !momoAmt) return;

      const w = parseFloat(input.value) || 0;
      const amt = (w * 0.3).toFixed(2);
      amountDue.textContent = w > 0 ? "Amount due: GHS " + amt : "";
      momoAmt.textContent = "GHS " + (w > 0 ? amt : "0.00");
    }

    function backToPlan() {
      const planSelect = document.getElementById("plan-select");
      const paymentForm = document.getElementById("payment-form");
      if (!planSelect || !paymentForm) return;

      planSelect.style.display = "block";
      paymentForm.style.display = "none";
    }

    function submitPayment() {
      const paymentForm = document.getElementById("payment-form");
      const success = document.getElementById("payment-success");
      if (!paymentForm || !success) return;

      paymentForm.style.display = "none";
      success.style.display = "flex";
    }

    function resetPayment() {
      const success = document.getElementById("payment-success");
      const planSelect = document.getElementById("plan-select");
      if (!success || !planSelect) return;

      success.style.display = "none";
      planSelect.style.display = "block";
    }

    function filterAdmin(filter: string, el: HTMLElement) {
      currentFilter = filter;
      document.querySelectorAll(".stat-card").forEach((c) => c.classList.remove("active"));
      el.classList.add("active");
      renderAdminTable(filter);
    }

    function updateStatus(id: number, status: string) {
      const p = payments.find((x) => x.id === id);
      if (!p) return;

      p.status = status;

      const badge = document.getElementById("badge-" + id);
      if (badge) {
        badge.className = "badge badge-" + status;
        badge.textContent = status;
      }

      const actions = document.getElementById("actions-" + id);
      if (actions) actions.innerHTML = '<span style="color:#333;font-size:12px;">—</span>';

      const cntPending = document.getElementById("cnt-pending");
      const cntConfirmed = document.getElementById("cnt-confirmed");
      const cntRejected = document.getElementById("cnt-rejected");
      if (cntPending) cntPending.textContent = String(payments.filter((x) => x.status === "pending").length);
      if (cntConfirmed) cntConfirmed.textContent = String(payments.filter((x) => x.status === "confirmed").length);
      if (cntRejected) cntRejected.textContent = String(payments.filter((x) => x.status === "rejected").length);
    }

    // Expose globals so inline handlers from the raw HTML can call them.
    (window as any).showTab = showTab;
    (window as any).selectPlan = selectPlan;
    (window as any).updateAmount = updateAmount;
    (window as any).backToPlan = backToPlan;
    (window as any).submitPayment = submitPayment;
    (window as any).resetPayment = resetPayment;
    (window as any).filterAdmin = filterAdmin;
    (window as any).renderAdminTable = renderAdminTable;
    (window as any).updateStatus = updateStatus;
  }, []);

  return null;
}

