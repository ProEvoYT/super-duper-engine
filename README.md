# Zero Studio.X — Manual Payment Tracker

A minimal MVP for tracking manual MoMo (Mobile Money) payments.
Built with Next.js 14 App Router, Prisma, PostgreSQL, and Tailwind CSS.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your PostgreSQL/NeonDB connection string:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/zero_studio_x"
```

> **Local PostgreSQL example:**
> `postgresql://postgres:password@localhost:5432/zero_studio_x`

### 3. Set up the database

```bash
# Push schema to your database
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 4. Run the dev server

```bash
npm run dev
```

---

## Routes

| Route | Description |
|---|---|
| `/payment` | Public payment submission form |
| `/admin` | Admin dashboard to verify payments |
| `POST /api/payments` | Submit a new payment |
| `GET /api/payments` | Fetch all payments |
| `PATCH /api/payments/[id]` | Confirm or reject a payment |

---

## Payment Types

| Type | Amount |
|---|---|
| VIP Weekly | Fixed GHS 150 |
| Pay After Winning | 30% of winnings |

---

## Notes

- No authentication (MVP)
- No external payment gateway
- All payments are manual via MTN / Telecel / AirtelTigo MoMo
- Update the MoMo numbers in `/app/payment/page.tsx` → `MOMO_NUMBERS`
