import { Response, Request } from "express";
import response from "../utils/response";
import MenuModel, { menuDTO } from "../models/menu.models";
import { IPaginationQuery } from "../utils/interface";
import { isValidObjectId } from "mongoose";

export default {
  async create(req: Request, res: Response) {
    try {
      await menuDTO.validate(req.body);
      const result = await MenuModel.create(req.body);

      response.success(res, result, "Success create menu");
    } catch (error) {
      response.error(res, error, "Failed create Menu");
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
          ],
        });
      }

      const result = await MenuModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      if (!result) return response.notFound(res, "Menu not found!");

      const total = await MenuModel.countDocuments(query);

      response.pagination(
        res,
        result,
        { total, totalPage: Math.ceil(total / limit), current: page },
        "Success find all Menu"
      );
    } catch (error) {
      response.error(res, error, "Failed FindAll Menu");
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Menu not found");
      }

      const result = await MenuModel.findById(id);

      if (!result) return response.notFound(res, "Menu not found");

      response.success(res, result, "Success find one Menu");
    } catch (error) {
      response.error(res, error, "Failed findOne Menu");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Menu not found");
      }

      const result = await MenuModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) return response.notFound(res, "Menu not found");

      response.success(res, result, "Success update Menu");
    } catch (error) {
      response.error(res, error, "Failed update Menu");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Menu not found");
      }

      const result = await MenuModel.findByIdAndDelete(id, { new: true });

      if (!result) return response.notFound(res, "Menu not found");

      response.success(res, result, "Success delete Menu");
    } catch (error) {
      response.error(res, error, "Failed delete Menu");
    }
  },
};
