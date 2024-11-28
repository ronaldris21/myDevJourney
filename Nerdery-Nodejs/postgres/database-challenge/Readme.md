## 📌 Challenge

Create ERD that allows the implementation of the following requirements

```markdown
## Mandatory Features

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