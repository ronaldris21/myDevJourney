import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
      default:
        'https://ui-avatars.com/api/?background=DDEDFC&color=3474E3&name=Profile&size=128&font-size=0.10&length=2',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
