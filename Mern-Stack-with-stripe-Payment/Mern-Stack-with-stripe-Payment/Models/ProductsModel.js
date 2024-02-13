import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    images: [{ type: String }],
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    tags: [{ type: String }],
    salesOffer: {
      status: { type: Boolean, required: true, default: false },
      discount: { type: Number, required: true, default: 0 },
    },
    stock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model('Products', ProductSchema);
export default Products;
