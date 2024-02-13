// STRIPE CHECKOUT
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import { protect } from '../middleware/Auth.js';
import { updateOrderToPaid } from '../Controllers/OrderController.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
let endpointSecret;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Cart items
const Cart = (orderItems) => {
  let cart = [];
  orderItems.forEach((item) => {
    cart.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          description: `Size: ${item.size} | Color: ${item.color}`,
          metadata: {
            id: item.product,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    });
  });
  return cart;
};

// @desc create checkout session
// @route POST /api/shop/orders/checkout
// @access Private

router.post(
  '/checkout',
  protect,
  expressAsyncHandler(async (req, res) => {
    // from the frontend
    const { orderItems, id, email } = req.body;

    // customer checkout session
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user?._id.toString(),
        orderId: id,
        email: email,
      },
    });
    try {
      const session = await stripe.checkout.sessions.create({
        // shipping information
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'FR'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'usd',
              },
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 10,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1500,
                currency: 'usd',
              },
              display_name: 'Express shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 5,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 4500,
                currency: 'usd',
              },
              display_name: 'Premium shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 2,
                },
              },
            },
          },
        ],
        line_items: Cart(orderItems),
        phone_number_collection: {
          enabled: true,
        },
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/order/${id}`,
        cancel_url: `${process.env.CLIENT_URL}/order/${id}`,
        // customer information
        customer: customer.id,
      });
      res.json({
        url: session.url,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
);

// @desc create webhook
// @route POST /api/shop/orders/webhook
// @access Private

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),

  (req, res) => {
    const sig = req.headers['stripe-signature'];

    let data;
    let eventType;
    // Verify webhook signature and extract the event.
    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log(`⚠️  Webhook received!`);
      } catch (err) {
        console.log(
          `⚠️  Webhook signature verification failed. ${err.message}`
        );
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // handle the event
    if (eventType === 'checkout.session.completed') {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          // update the order
          updateOrderToPaid(customer, data);
        })
        .catch((err) => {
          console.log(`⚠️  Error: ${err.message}`);
        });
    }

    res.send().end();
  }
);

export default router;
