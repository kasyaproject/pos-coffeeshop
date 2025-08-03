import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";
import payment, { TypeResponseMidtrans } from "../utils/payment";
import { getId } from "../utils/id";

const Schema = mongoose.Schema;

const orderItemSchema = Yup.object({
  menu: Yup.string().required(), // ID menu
  quantity: Yup.number().required(), // Jumlah item
});

export const orderDTO = Yup.object({
  cust: Yup.string().required(),
  item: Yup.array().of(orderItemSchema).required(),
  note: Yup.string(),
  voucher: Yup.string(), // Kode voucher (opsional)
});

export enum OrderStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  COMPLETE = "Complete",
  CANCELLED = "Cancelled",
}

export type TypeOrder = Yup.InferType<typeof orderDTO>;

export interface Order extends Omit<TypeOrder, "order"> {
  menu: ObjectId;
  payment: TypeResponseMidtrans;
  orderId: string;
  totalPrice: number;
  orderStatus: string;
}

const OrderSchema = new Schema<Order>(
  {
    orderId: { type: Schema.Types.String },
    cust: { type: Schema.Types.String, required: true },
    item: [
      {
        menu: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Schema.Types.Number, required: true },
      },
    ],
    totalPrice: { type: Schema.Types.Number, required: true },
    payment: {
      type: {
        token: { type: Schema.Types.String, required: true },
        redirect_url: { type: Schema.Types.String, required: true },
      },
    },
    voucher: { type: Schema.Types.String, required: false },
    orderStatus: {
      type: Schema.Types.String,
      enum: [
        OrderStatus.PENDING,
        OrderStatus.PROCESSING,
        OrderStatus.COMPLETE,
        OrderStatus.CANCELLED,
      ],
      default: OrderStatus.PENDING,
    },
    note: { type: Schema.Types.String, required: true },
  },
  { timestamps: true }
).index({ cust: "text", item: "text" });

// Middleware Model
OrderSchema.pre("save", async function () {
  // sebelum order disimpan generate link payment
  const order = this;

  order.orderId = getId(); // generate Id untuk digunakan di payment

  // Generate link payment
  order.payment = await payment.createLink({
    transaction_details: {
      gross_amount: order.totalPrice,
      order_id: order.orderId,
    },
  });
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
