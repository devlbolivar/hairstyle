import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "Please enter product name"],
        },
        quantity: {
          type: Number,
          required: [true, "Please enter product quantity"],
        },
        image: {
          type: String,
          required: [true, "Please enter product image"],
        },
        price: {
          type: Number,
          required: [true, "Please enter product price"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: [true, "Please enter your address"],
      },
      city: {
        type: String,
        required: [true, "Please enter your city"],
      },
      postalCode: {
        type: String,
        required: [true, "Please enter your postal code"],
      },
      country: {
        type: String,
        required: [true, "Please enter your country"],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, "Please enter payment method"],
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      update_time: {
        type: String,
      },
      email_address: {
        type: String,
      },
    },
    itemsPrice: {
      type: Number,
      required: [true, "Please enter items price"],
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: [true, "Please enter tax price"],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, "Please enter shipping price"],
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, "Please enter total price"],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
