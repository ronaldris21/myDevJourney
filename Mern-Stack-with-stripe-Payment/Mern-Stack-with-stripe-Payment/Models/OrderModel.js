import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        size: { type: String, required: true },
        color: { type: String, required: true },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Products',
        },
      },
    ],

    shippingAddress: {
      fullName: {
        type: String,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      address: {
        type: String,
      },
      location: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      shippingMethod: {
        type: String,
      },
      shippingCost: {
        type: Number,
      },
    },
    payments: {
      paymentMethod: {
        type: String,
      },
      status: {
        type: String,
        required: true,
        default: 'pending',
      },
      paymentDate: {
        type: Date,
      },
    },
    delivery: {
      status: {
        type: String,
        required: true,
        default: 'awaiting',
      },
      deliveryDate: {
        type: Date,
      },
      deliveryMethod: {
        type: String,
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    subTotalPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
