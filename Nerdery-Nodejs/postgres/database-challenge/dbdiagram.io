
ROLES
-
id SERIAL PK
name VARCHAR(25)


PERMISSION_ROLES
-
role_id INT PK FK > ROLES.id
entity_name VARCHAR(50) PK
action_name VARCHAR(25) PK


USERS
-
id SERIAL PK
last_name VARCHAR(50)
first_name VARCHAR(50)
email VARCHAR(255) UNIQUE
password_hash VARCHAR(255)
role_id int FK > ROLES.id
created_at TIMESTAMP
signin_fail_attempts INT 


PASSWORD_RESETS
-
reset_token UUID PK
user_id INT FK > USERS.id
valid_until DATE
created_at DATE
can_update_password BOOLEAN

CATEGORY 
-
id SERIAL pk
name VARCHAR(50) INDEX
sup_category_id INT FK > CATEGORY.id


PRODUCTS
-
id SERIAL PK
name VARCHAR(255)
gender GENDER_TYPE
thumbnail_url VARCHAR(255)
category_id INT FK > CATEGORY.id
description TEXT
is_enable BOOLEAN
created_at TIMESTAMP
updated_at TIMESTAMP



PRODUCT_DETAILS
-
id INT PK
product_id int FK > PRODUCTS.id
price DECIMAL(10,2)
discount DECIMAL(2,2)
size VARCHAR(10)
color VARCHAR(20)
stock INT
is_email_low_stock_sent BOOLEAN
email_sent_at TIMESTAMP
stock_refilled_at TIMESTAMP



PRODUCT_IMAGES
-
id SERIAL PK
product_details_id INT FK > PRODUCT_DETAILS.id
image_url VARCHAR(255)


ORDERS
-
id SERIAL PK
user_id INT FK > USERS.id
total_price DECIMAL(10,2)
total_discount DECIMAL(10,2)
status VARCHAR(50)
created_at TIMESTAMP

ORDER_ITEMS
-
id SERIAL PK
order_id INT FK > ORDERS.id
product_details_id INT FK > PRODUCT_DETAILS.id
quantity INT
price DECIMAL(10,2)

CART_ITEMS
-
user_id INT PK FK > USERS.id
product_details_id INT PK FK > PRODUCT_DETAILS.id
quantity INT

PRODUCT_LIKES
-
user_id INT PK FK > USERS.id
product_details_id INT PK FK > PRODUCT_DETAILS.id
liked_at TIMESTAMP
PK(user_id, product_id)

STRIPE_PAYMENTS
-
id SERIAL PK
user_id INT FK > USERS.id
order_id INT FK > ORDERS.id
stripe_payment_id VARCHAR(255) UNIQUE
amount DECIMAL(10,2)
status VARCHAR(50)
created_at TIMESTAMP

EMAIL_TEMPLATES
-
id SERIAL PK
template TEXT 
type TEXT
updated_at TIMESTAMP
updated_by INT fk > USERS.id


