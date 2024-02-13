  import mongoose from "mongoose";

  const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

  const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      isPorfolio:{
        type: Boolean,
        default: false,
      },
      isShownInService:{
        type: Boolean,
        default: false,
      },
      image: { ////MAIN IMAGE! 
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
      },
      // images:[multimediaSchema],
      multimedia:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Multimedia",
        }
      ],
      plans: {
        basic: {
          name: { type: String, default: "Básico", required: true },
          description: { type: String, default: "" },
          price:{type: Number, default: 100, required: true,},
          revisionsCount: { type: Number, default: 1, required: true },
          deliveryDays: { type: Number, default: 1, required: true },
          includes: { type: String, },
          isPlanUsed: {type: Boolean, default: false},
        },
        standard: {
          name: { type: String, default: "Estándar", required: true },
          description: { type: String, default: "" },
          price:{type: Number, default: 500, required: true,},
          revisionsCount: { type: Number, default: 2, required: true },
          deliveryDays: { type: Number, default: 5, required: true },
          includes: { type: String, },
          isPlanUsed: {type: Boolean, default: false},
        },
        premium: {
          name: { type: String, default: "Premium", required: true },
          description: { type: String, default: "" },
          price:{type: Number, default: 800, required: true,},
          revisionsCount: { type: Number, default: 3, required: true },
          deliveryDays: { type: Number, default: 10, required: true },
          includes: { type: String, },
          isPlanUsed: {type: Boolean, default: false},
        },
        
      },
      reviews: [reviewSchema],
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  // Método para eliminar un elemento de multimedia
productSchema.methods.removeMultimedia = async function(multimediaId) {
  const index = this.multimedia.indexOf(multimediaId);
  if (index !== -1) {
    this.multimedia.splice(index, 1);
    await this.save();
  }
};

  const Product = mongoose.model("Product", productSchema);
  const Review = mongoose.model("Review", reviewSchema);

  export { Product, Review };
