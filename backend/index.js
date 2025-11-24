// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './database/db.js';
// import authRoutes from './routes/user.route.js';
// import { useSelector } from 'react-redux';

// dotenv.config();
// await connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());
// const YOUR_DOMAIN = 'http://localhost:5000';
// const {cart}=useSelector((state)=>state);
// // app.post('/create-checkout-session', async (req, res) => {
// //   const session = await stripe.checkout.sessions.create({
// //     line_items: [
// //       {
// //         // Provide the exact Price ID (for example, price_1234) of the product you want to sell
// //         price: `${cart.items[0].priceId}`,
// //         quantity: 1,
// //       },
// //     ],
// //     mode: 'payment',
// //     success_url: `${YOUR_DOMAIN}?success=true`,
// //   });

// //   res.redirect(303, session.url);
// // });

// app.post('/create-payment-intent', async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'inr',
//     });
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });
// // Base test route (optional)
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Routes
// app.use('/api/users', authRoutes);

// // Route not found handler (MUST be last)


// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// server/index.js
import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors()); // allow from frontend origin in production restrict it
app.use(express.json());

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Warning: STRIPE_SECRET_KEY not set in .env");
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  try {
    // Frontend will send: { publishableKey, successUrl, amount, currency }
    // We ignore publishableKey on server (not needed) but accept it per your requirement.
    const { successUrl, amount, currency = "usd", metadata } = req.body;

    if (!successUrl || !amount) {
      return res.status(400).json({ error: "Missing successUrl or amount" });
    }

    // amount must be in smallest currency unit (e.g., cents for USD).
    // We assume frontend provides amount in major units (like 10.50) OR integer in smallest unit.
    // To be safe, support both:
    let unitAmount;
    if (Number(amount) % 1 === 0 && String(amount).length >= 3 && Number(amount) > 1000) {
      // crude guess it's already smallest unit; but safe approach is to let frontend send cents if desired.
      unitAmount = Number(amount);
    } else {
      // treat as major currency units -> convert to cents (2 decimal currencies)
      unitAmount = Math.round(Number(amount) * 100);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "Purchase",
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      // After successful payment Stripe will append ?session_id={CHECKOUT_SESSION_ID} to success_url
      success_url: successUrl + (successUrl.includes("?") ? "&" : "?") + "session_id={CHECKOUT_SESSION_ID}",
      cancel_url: successUrl, // optionally redirect back to same page or a cancel page
      metadata: metadata || {},
    });

    // Return the session URL for redirect (recommended)
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal error" });
  }
});

// Verify payment using session_id returned by Stripe on success_url
app.get("/verify-payment", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "session_id required" });

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    // session.payment_status can be 'paid' when successful for Checkout
    const paymentIntent = session.payment_intent || null;
    res.json({
      id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_intent: paymentIntent ? {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
      } : null,
      raw: session,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal error" });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
