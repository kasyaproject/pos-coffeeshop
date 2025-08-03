import { Request, Response } from "express";
import response from "../utils/response";
import VoucherModel, { voucherDTO } from "../models/voucher.model";
import { IPaginationQuery } from "../utils/interface";
import { isValidObjectId } from "mongoose";

export default {
  async create(req: Request, res: Response) {
    try {
      await voucherDTO.validate(req.body); // validasi terhadap Yup yang ada di model
      const result = await VoucherModel.create(req.body);

      response.success(res, result, "Success create Voucher");
    } catch (error) {
      response.error(res, error, "Failed to create voucher");
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

      const result = await VoucherModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      if (!result) return response.notFound(res, "Voucher not found!");

      const total = await VoucherModel.countDocuments(query);

      response.pagination(
        res,
        result,
        { total, totalPage: Math.ceil(total / limit), current: page },
        "Success find all Voucher"
      );
    } catch (error) {
      response.error(res, error, "Failed to findAll voucher");
    }
  },

  async FindOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Voucher not found");
      }

      const result = await VoucherModel.findById(id);

      if (!result) return response.notFound(res, "Voucher not found");

      response.success(res, result, "Success find one Voucher");
    } catch (error) {
      response.error(res, error, "Failed to findOne voucher");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Voucher not found");
      }

      const result = await VoucherModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) return response.notFound(res, "Voucher not found");

      response.success(res, result, "Success update Voucher");
    } catch (error) {
      response.error(res, error, "Failed to update voucher");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Voucher not found");
      }

      const result = await VoucherModel.findByIdAndDelete(id, {
        new: true,
      });

      if (!result) return response.notFound(res, "Voucher not found");

      response.success(res, result, "Success delete Voucher");
    } catch (error) {
      response.error(res, error, "Failed to delete voucher");
    }
  },
};
