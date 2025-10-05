// api/create-checkout-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { items } = await req.json();
    const line_items = items.map((item) => ({
      price_data: {
        currency: "ron",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: `${item.title} — ${item.format}${item.lang ? ` ${item.lang}` : ""}`,
        },
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.SITE_URL || "https://midaway.vercel.app"}/#/thanks`,
      cancel_url: `${process.env.SITE_URL || "https://midaway.vercel.app"}/#/checkout`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe error" });
  }
}
