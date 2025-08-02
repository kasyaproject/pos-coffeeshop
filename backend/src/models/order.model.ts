import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

const orderItemSchema = Yup.object({
  menu: Yup.string().required(), // ID menu
  quantity: Yup.number().required(), // Jumlah item
});

export const orderDTO = Yup.object({
  cust: Yup.string().required(),
  item: Yup.array().of(orderItemSchema).required(),
  totalPrice: Yup.number().required(),
  orderStatus: Yup.string().required(),
  note: Yup.string(),
});

export enum OrderStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  COMPLETE = "complete",
  CANCELLED = "cancelled",
}

export type TypeOrder = Yup.InferType<typeof orderDTO>;

export interface Order extends Omit<TypeOrder, "order"> {
  menu: ObjectId;
}

const OrderSchema = new Schema<Order>(
  {
    cust: { type: Schema.Types.String, required: true },
    item: [
      {
        menu: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Schema.Types.Number, required: true },
      },
    ],
    totalPrice: { type: Schema.Types.Number, required: true },
    note: { type: Schema.Types.String, required: true },
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
  },
  { timestamps: true }
).index({ cust: "text", item: "text" });

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
