import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

export const reviewDTO = Yup.object({
  cust: Yup.string().required(),
  star: Yup.number().required(),
  comment: Yup.string().required(),
  menu: Yup.string().required(),
});

export type TypeReview = Yup.InferType<typeof reviewDTO>;

export interface Review extends Omit<TypeReview, "menu"> {
  menu: ObjectId;
}

const ReviewSchema = new Schema<Review>(
  {
    cust: { type: Schema.Types.String, required: true },
    star: { type: Schema.Types.Number, required: true },
    comment: { type: Schema.Types.String, required: true },
    menu: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
  },
  { timestamps: true }
).index({ cust: "text" });

const ReviewModel = mongoose.model("Review", ReviewSchema);

export default ReviewModel;
