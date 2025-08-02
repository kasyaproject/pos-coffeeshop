import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

export const menuDTO = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
  size: Yup.string().required(),
  image: Yup.string().required(),
  category: Yup.string().required(),
  isActive: Yup.boolean().required(),
});

export type TypeMenu = Yup.InferType<typeof menuDTO>;

export interface Menu extends Omit<TypeMenu, "category"> {
  category: ObjectId;
}

const MenuSchema = new Schema<Menu>(
  {
    name: { type: String, required: true },
    description: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    size: { type: Schema.Types.String, required: true },
    image: { type: Schema.Types.String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    isActive: { type: Schema.Types.Boolean, required: true },
  },
  { timestamps: true }
).index({ name: "text" });

const MenuModel = mongoose.model("Menu", MenuSchema);

export default MenuModel;
