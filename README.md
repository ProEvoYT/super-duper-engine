# Zero Studio.X Payment Gateway

A minimal and secure payment gateway for the Zero Studio.X VIP odds community.

This system allows users to make payments for VIP weekly membership or pay a commission after successful winnings using Mobile Money or card payments.

---

## Features

- VIP Weekly subscription payments (GHS 150/week)
- Pay-after-winning payments (30% of winnings)
- Mobile Money and card payments
- Secure transaction processing
- Admin dashboard for viewing transactions
- Payment verification via Paystack

---

## Payment Options

### VIP Weekly
Users can pay a fixed **GHS 150 weekly fee** to access the VIP odds group.

### Pay After Winning
Users who benefit from winning tips can pay **30% of their winnings** as a commission.

Rules:
- Minimum stake required: **GHS 20**
- Payments are **final (no refunds)**

---

## Tech Stack

Frontend
- Next.js
- TypeScript
- TailwindCSS

Backend
- Next.js API Routes

Database
- PostgreSQL
- Prisma ORM

Payments
- Paystack API

---

## Project Structure
src/
app/
pay/
vip/
pay-after/
admin/
api/
prisma/



---

## Payment Flow

1. User opens the payment page
2. User selects a payment option
3. User enters their details
4. Payment is processed through Paystack
5. Paystack sends a webhook confirmation
6. Transaction is stored in the database
7. Admin can view transactions in the dashboard

---

## Environment Variables

Create a `.env` file and add:


DATABASE_URL="your_postgres_connection"
PAYSTACK_SECRET_KEY="your_secret_key"
PAYSTACK_PUBLIC_KEY="your_public_key"


---

## Running the Project

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open:

```
http://localhost:3000/pay
```

---

## Security

- Payment verification is handled server-side
- Transactions are confirmed using Paystack APIs
- Admin dashboard access is restricted

---

## Disclaimer

This platform only facilitates payment processing for the Zero Studio.X VIP community.  
Payments do **not guarantee betting success**.

All payments are **final and non-refundable**.

---

## Future Improvements

- Email payment confirmations
- Automatic VIP access management
- Payment analytics dashboard
- Better fraud prevention tools

---

## License

Private project for Zero Studio.X
```

---
