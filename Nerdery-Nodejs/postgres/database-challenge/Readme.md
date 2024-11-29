## 📌 Challenge 

### NOTION REPO: https://ronaldris.notion.site/DB-ERD-Challenge-b1632e7c4a744b29936405625a88fb8d 

Create ERD that allows the implementation of the following requirements

```markdown
## Mandatory Features

SPORT ITEMS AND CLOTHING

1. Authentication endpoints (sign up, sign in, sign out, forgot, reset password)
2. List products with pagination
3. Search products by category
4. Add 2 kinds of users (Manager, Client)
5. As a Manager I can:
    * Create products
    * Update products
    * Delete products
    * Disable products
    * Show clients orders
    * Upload images per product.
6. As a Client I can:
    * See products 
    * See the product details
    * Buy products
    * Add products to cart
    * Like products
    * Show my order
7. The product information(included the images) should be visible for logged and not logged users
8. Stripe Integration for payment (including webhooks management) 

## Extra points

* When the stock of a product reaches 3, notify the last user that liked it and not purchased the product yet with an email. 
* Send an email when the user changes the password

```

# Final Considerations:

## **Index:**

 Index uses a multilevel hash instead of using a linear approach. So searching becomes faster.

- [category.name](http://category.name)
- [products.name](http://products.name)
- products.gender
- orders.status

## PASSWORD_RESETS:

- This token is send using a email template, in a link where it sets the “can_activate_password” into true.
- I was thinking about making it valid within an hour

## **JWT - refresh_token:**

JWT

- This way I  can validate easier auth on required requests.
- Payload must contain at least: [user.id](http://user.id) and user.role, and the current refresh_token for the session.

## Refresh Token:

- https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
- I decide to have a separated table in order to handle better multiple sessions and provide possible functionality of invalidate certain sessions and refresh tokens because changing password may leave security leaks from other refresh_tokens if still from other sessions.

## **Stripe currencies - VARCHAR(3) - lowercase**

- https://docs.stripe.com/currencies

## PERMISSION_ROLES (this may change upon next modules)

- JWT brings the role in the payload, so I can validate the role base on that.
- I can either later decide a decorator approach on NEST.js or using the payload to consult the database permissions based on the request I’m handling.
- Erick suggestions:
    - PERMISSIONS BASED ON SLUGS - LARAVEL SPATTE - AUTH PACKAGER,
        - Individual roles and user permission assignation.
    - PATRON granular - roles, permissions, users

## CATEGORIES:

- Categories references itself using the sup_category_id
- My intention is to provide multiple categories levels if needed.

## **Stripe Payment Request:**

- https://docs.stripe.com/api/payment_intents/create
- First I made a request HTTP
    
    ```jsx
    const stripe = require('stripe')('sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y');
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    ```
    
- Response
    
    this "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa" is the one saved in the database for tracking the Stripe Payment and then compared the webhook in order to confirm the payment from Stripe. 
    
    - Response
        
        ```jsx
        {
          "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa",
          "object": "payment_intent",
          "amount": 2000,
          "amount_capturable": 0,
          "amount_details": {
            "tip": {}
          },
          "amount_received": 0,
          "application": null,
          "application_fee_amount": null,
          "automatic_payment_methods": {
            "enabled": true
          },
          "canceled_at": null,
          "cancellation_reason": null,
          "capture_method": "automatic",
          "client_secret": "pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH",
          "confirmation_method": "automatic",
          "created": 1680800504,
          "currency": "usd",
          "customer": null,
          "description": null,
          "invoice": null,
          "last_payment_error": null,
          "latest_charge": null,
          "livemode": false,
          "metadata": {},
          "next_action": null,
          "on_behalf_of": null,
          "payment_method": null,
          "payment_method_options": {
            "card": {
              "installments": null,
              "mandate_options": null,
              "network": null,
              "request_three_d_secure": "automatic"
            },
            "link": {
              "persistent_token": null
            }
          },
          "payment_method_types": [
            "card",
            "link"
          ],
          "processing": null,
          "receipt_email": null,
          "review": null,
          "setup_future_usage": null,
          "shipping": null,
          "source": null,
          "statement_descriptor": null,
          "statement_descriptor_suffix": null,
          "status": "requires_payment_method",
          "transfer_data": null,
          "transfer_group": null
        }
        ```
        

## Stripe Webhook

- https://docs.stripe.com/webhooks

https://docs.stripe.com/api/payment_intents 

PaymentIntent Original: **`requires_payment_method`** 

- **Lifecycle of PaymentIntent Statuses:**
    1. **`requires_payment_method`** (Initial Status):
        - The `PaymentIntent` has been created, but no payment method has been provided yet.
        - The frontend must send the user's payment details.
    2. **`requires_confirmation`**:
        - Stripe has received the payment method, but the `PaymentIntent` has not been confirmed yet.
        - You need to confirm the payment via the backend or frontend (depending on your setup).
    3. **`requires_action`**:
        - Stripe requires an additional action from the customer (e.g., 3D Secure authentication).
    4. **`processing`**:
        - The payment is being processed (e.g., a bank transfer that takes time).
    5. **`succeeded`**:
        - The payment was successful. This is the final state for successful transactions.
    6. **`requires_capture`** (Optional):
        - The payment is authorized but requires manual capture (if `capture_method` is set to `manual`).
    7. **`canceled`**:
        - The `PaymentIntent` was canceled before completion.
    8. **`failed`**:
        - The payment failed, usually due to issues with the payment method or authentication.
- Webhook controller:
    - https://docs.stripe.com/webhooks#webhook-endpoint-def
    
    On my Stripe account I listen to the ABOVE PaymentIntent Statuses and I update the webhook_payment_intent
    
    This way I confirm from Stripe the payment went through successfully!