import "./globals.css";
import React from "react";
import PreviewScript from "./PreviewScript";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Preview layout: matches the static HTML you provided.
  // Route-specific React pages are intentionally not rendered in this preview.
  void children;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zero Studio.X — Preview</title>
        <style>{`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #050505; display: flex; justify-content: center; padding: 32px 16px; min-height: 100vh; font-family: 'DM Mono', 'Courier New', monospace; }
  .zx-root {
    font-family: 'DM Mono', 'Courier New', monospace;
    background: #0A0A0A;
    color: #F5F2ED;
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    max-width: 860px;
    border: 1px solid #1A1A1A;
  }
  .tab-bar { display: flex; border-bottom: 1px solid #222; background: #0A0A0A; }
  .tab {
    padding: 12px 20px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; color: #555; border: none; background: none;
    border-bottom: 2px solid transparent; transition: all 0.15s;
  }
  .tab.active { color: #C9A84C; border-bottom-color: #C9A84C; }
  .tab:hover:not(.active) { color: #888; }
  .logo-bar { display: flex; align-items: center; gap: 10px; padding: 16px 24px; border-bottom: 1px solid #181818; }
  .logo-box { width: 28px; height: 28px; background: #C9A84C; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #000; }
  .logo-label { font-size: 10px; color: #555; letter-spacing: 0.12em; text-transform: uppercase; }
 
  .payment-view { padding: 24px; }
  .plan-title { font-size: 11px; color: #555; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px; }
  .plan-card {
    border: 1px solid #222; padding: 16px; cursor: pointer;
    transition: border-color 0.15s; margin-bottom: 10px;
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .plan-card:hover, .plan-card.selected { border-color: #C9A84C; }
  .plan-name { font-size: 16px; color: #F5F2ED; margin-bottom: 4px; font-family: Georgia, serif; }
  .plan-sub { font-size: 11px; color: #555; }
  .plan-price { font-size: 18px; color: #C9A84C; font-weight: 600; }
  .plan-currency { font-size: 10px; color: #555; text-align: right; }
 
  .momo-box { border: 1px solid rgba(201,168,76,0.3); background: rgba(201,168,76,0.05); padding: 14px; margin-bottom: 16px; }
  .momo-title { font-size: 10px; color: #C9A84C; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px; }
  .momo-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
  .momo-net { font-size: 11px; color: #666; }
  .momo-num { font-size: 12px; color: #F5F2ED; }
 
  .field { margin-bottom: 12px; }
  .field label { display: block; font-size: 10px; color: #666; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
  .field input, .field select {
    width: 100%; background: #1A1A1A; border: 1px solid #2A2A2A;
    color: #F5F2ED; padding: 10px 12px; font-size: 12px;
    font-family: 'DM Mono', monospace; outline: none; transition: border-color 0.15s;
  }
  .field input:focus, .field select:focus { border-color: #C9A84C; }
  .field select option { background: #1A1A1A; }
 
  .btn-gold {
    background: #C9A84C; color: #000; border: none; padding: 12px 24px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; width: 100%; transition: background 0.15s; font-family: 'DM Mono', monospace;
  }
  .btn-gold:hover { background: #E2C97E; }
 
  .admin-view { padding: 0; }
  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #1A1A1A; border-bottom: 1px solid #1A1A1A; }
  .stat-card { background: #0D0D0D; padding: 16px; cursor: pointer; transition: background 0.15s; }
  .stat-card:hover, .stat-card.active { background: #111; }
  .stat-card.active .stat-num { color: #C9A84C; }
  .stat-num { font-size: 22px; color: #F5F2ED; margin-bottom: 2px; }
  .stat-label { font-size: 10px; color: #444; letter-spacing: 0.1em; text-transform: uppercase; }
 
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: 10px 14px; font-size: 10px; color: #444; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid #1A1A1A; }
  td { padding: 12px 14px; font-size: 12px; border-bottom: 1px solid #111; }
  tr:hover td { background: #0D0D0D; }
 
  .badge { display: inline-block; padding: 3px 8px; font-size: 10px; letter-spacing: 0.05em; border: 1px solid; }
  .badge-pending { color: #FBBF24; background: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.3); }
  .badge-confirmed { color: #34D399; background: rgba(52,211,153,0.08); border-color: rgba(52,211,153,0.3); }
  .badge-rejected { color: #F87171; background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.3); }
 
  .btn-confirm { font-size: 10px; padding: 4px 10px; cursor: pointer; font-family: monospace; background: rgba(52,211,153,0.1); color: #34D399; border: 1px solid rgba(52,211,153,0.3); transition: background 0.15s; margin-right: 4px; }
  .btn-confirm:hover { background: rgba(52,211,153,0.2); }
  .btn-reject { font-size: 10px; padding: 4px 10px; cursor: pointer; font-family: monospace; background: rgba(248,113,113,0.1); color: #F87171; border: 1px solid rgba(248,113,113,0.3); transition: background 0.15s; }
  .btn-reject:hover { background: rgba(248,113,113,0.2); }
 
  .amount-cell { color: #C9A84C; font-weight: 600; }
  .muted { color: #555; }
 
  .success-view { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; padding: 32px; text-align: center; }
  .success-icon { width: 56px; height: 56px; border: 2px solid #C9A84C; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
  .check { width: 22px; height: 22px; stroke: #C9A84C; fill: none; stroke-width: 2; }
  .ref-box { background: #1A1A1A; border: 1px solid #2A2A2A; padding: 10px 20px; font-size: 13px; color: #F5F2ED; margin: 12px 0 20px; display: inline-block; }
        `}</style>
      </head>
      <body>
        <div
          dangerouslySetInnerHTML={{
            __html: `<div class="zx-root">
  <div class="logo-bar">
    <div class="logo-box">ZX</div>
    <span class="logo-label">Zero Studio.X</span>
  </div>
 
  <div class="tab-bar">
    <button class="tab active" onclick="showTab('payment')">Payment Page</button>
    <button class="tab" onclick="showTab('admin')">Admin Dashboard</button>
  </div>
 
  <!-- PAYMENT VIEW -->
  <div id="view-payment" class="payment-view">
    <div id="plan-select">
      <p class="plan-title">Select payment plan</p>
      <div class="plan-card" onclick="selectPlan('vip')">
        <div>
          <div class="plan-name">VIP Weekly</div>
          <div class="plan-sub">Fixed weekly access pass</div>
        </div>
        <div>
          <div class="plan-price">150</div>
          <div class="plan-currency">GHS</div>
        </div>
      </div>
      <div class="plan-card" onclick="selectPlan('paw')">
        <div>
          <div class="plan-name">Pay After Winning</div>
          <div class="plan-sub">30% of your winnings</div>
        </div>
        <div>
          <div class="plan-price">30%</div>
          <div class="plan-currency">of wins</div>
        </div>
      </div>
      <p style="font-size:10px;color:#333;text-align:center;margin-top:16px;">All payments via Mobile Money · MTN · Telecel · AirtelTigo</p>
    </div>
 
    <div id="payment-form" style="display:none;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <button onclick="backToPlan()" style="background:none;border:none;color:#555;font-size:11px;cursor:pointer;font-family:monospace;">← Back</button>
        <span id="plan-badge" style="font-size:10px;color:#C9A84C;letter-spacing:0.1em;text-transform:uppercase;"></span>
      </div>
 
      <div id="winnings-field" class="field" style="display:none;">
        <label>Your winnings (GHS)</label>
        <input type="number" id="winnings-input" placeholder="e.g. 500.00" oninput="updateAmount()" />
        <div id="amount-due" style="font-size:11px;color:#C9A84C;margin-top:6px;"></div>
      </div>
 
      <div class="momo-box">
        <div class="momo-title">Send payment to:</div>
        <div class="momo-row"><span class="momo-net">MTN</span><span class="momo-num">055 000 0000</span></div>
        <div class="momo-row"><span class="momo-net">Telecel</span><span class="momo-num">020 000 0000</span></div>
        <div class="momo-row"><span class="momo-net">AirtelTigo</span><span class="momo-num">026 000 0000</span></div>
        <div style="border-top:1px solid rgba(201,168,76,0.2);padding-top:10px;margin-top:10px;display:flex;justify-content:space-between;">
          <span style="font-size:11px;color:#666;">Amount</span>
          <span id="momo-amt-val" style="font-size:13px;color:#C9A84C;font-weight:600;">GHS 150.00</span>
        </div>
      </div>
 
      <div class="field"><label>Full name</label><input type="text" placeholder="John Mensah" /></div>
      <div class="field"><label>Phone number</label><input type="tel" placeholder="0551234567" maxlength="10" /></div>
      <div class="field">
        <label>Mobile network</label>
        <select>
          <option value="">Select network</option>
          <option>MTN</option><option>Telecel</option><option>AirtelTigo</option>
        </select>
      </div>
      <div class="field"><label>MoMo reference / Transaction ID</label><input type="text" placeholder="e.g. 1234567890" /></div>
      <button class="btn-gold" onclick="submitPayment()">Submit Payment</button>
    </div>
 
    <div id="payment-success" style="display:none;" class="success-view">
      <div class="success-icon">
        <svg class="check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div style="font-family:Georgia,serif;font-size:28px;color:#C9A84C;margin-bottom:6px;">Submitted</div>
      <div style="font-size:11px;color:#666;margin-bottom:10px;">Reference recorded</div>
      <div class="ref-box">TX-2024-00847</div>
      <div style="font-size:11px;color:#444;margin-bottom:20px;line-height:1.7;">Your payment is pending verification.<br>An admin will confirm shortly.</div>
      <button class="btn-gold" style="width:auto;padding:10px 24px;" onclick="resetPayment()">Submit Another</button>
    </div>
  </div>
 
  <!-- ADMIN VIEW -->
  <div id="view-admin" style="display:none;" class="admin-view">
    <div class="stats-row">
      <div class="stat-card active" onclick="filterAdmin('all',this)"><div class="stat-num" id="cnt-all">6</div><div class="stat-label">All</div></div>
      <div class="stat-card" onclick="filterAdmin('pending',this)"><div class="stat-num" id="cnt-pending">3</div><div class="stat-label">Pending</div></div>
      <div class="stat-card" onclick="filterAdmin('confirmed',this)"><div class="stat-num" id="cnt-confirmed">2</div><div class="stat-label">Confirmed</div></div>
      <div class="stat-card" onclick="filterAdmin('rejected',this)"><div class="stat-num" id="cnt-rejected">1</div><div class="stat-label">Rejected</div></div>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Phone</th><th>Type</th><th>Amount</th>
            <th>Network</th><th>Reference</th><th>Status</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody id="admin-tbody"></tbody>
      </table>
    </div>
  </div>
</div>`
          }}
        />
        <PreviewScript />
      </body>
    </html>
  );
}

