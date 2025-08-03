import mongoose from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

export const voucherDTO = Yup.object({
  name: Yup.string().required(),
  kode: Yup.string().required(),
  description: Yup.string().required(),
  diskon: Yup.number().required(),
  startDate: Yup.string().required(),
  endDate: Yup.string().required(),
});

export type Voucher = Yup.InferType<typeof voucherDTO>;

const VoucherSchema = new Schema<Voucher>(
  {
    name: { type: Schema.Types.String, required: true },
    kode: { type: Schema.Types.String, required: true, unique: true },
    description: { type: Schema.Types.String, required: true },
    diskon: { type: Schema.Types.Number, required: true },
    startDate: { type: Schema.Types.String, required: true },
    endDate: { type: Schema.Types.String, required: true },
  },
  { timestamps: true }
).index({ name: "text", kode: "text", description: "text" });

const VoucherModel = mongoose.model("Voucher", VoucherSchema);

export default VoucherModel;
