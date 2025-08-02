import { Response, Request } from "express";
import response from "../utils/response";
import ReviewModel, { reviewDTO } from "../models/review.model";
import { IPaginationQuery } from "../utils/interface";
import { isValidObjectId } from "mongoose";

export default {
  async create(req: Request, res: Response) {
    try {
      await reviewDTO.validate(req.body);
      const result = await ReviewModel.create(req.body);

      response.success(res, result, "Success create review");
    } catch (error) {
      response.error(res, error, "Failed create review");
    }
  },

  async findAll(req: Request, res: Response) {
    const {
      page = 1,
      limit = 10,
      search,
    } = req.query as unknown as IPaginationQuery;

    try {
      const query = {};
      const { MenuId } = req.params;

      if (MenuId) {
        if (!isValidObjectId(MenuId)) {
          return response.notFound(res, "Menu not found");
        }
        Object.assign(query, { menu: MenuId });
      }

      // pencarian berdasarkan keyword
      if (search) {
        Object.assign(query, {
          $or: [
            {
              name: { $regex: search, $options: "i" },
            },
            {
              description: { $regex: search, $options: "i" },
            },
            {
              menu: { $regex: MenuId, $options: "i" },
            },
          ],
        });
      }

      const result = await ReviewModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      if (!result) return response.notFound(res, "Review not found!");

      const total = await ReviewModel.countDocuments(query);

      response.pagination(
        res,
        result,
        { total, totalPage: Math.ceil(total / limit), current: page },
        "Success find all Review"
      );
    } catch (error) {
      response.error(res, error, "Failed findAll review");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Review not found");
      }

      const result = await ReviewModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) return response.notFound(res, "Review not found");

      response.success(res, result, "Success update Review");
    } catch (error) {
      response.error(res, error, "Failed update review");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Review not found");
      }

      const result = await ReviewModel.findByIdAndDelete(id, {
        new: true,
      });

      if (!result) return response.notFound(res, "Review not found");

      response.success(res, result, "Success delete Review");
    } catch (error) {
      response.error(res, error, "Failed delete review");
    }
  },
};
