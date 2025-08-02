import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { IPaginationQuery } from "../utils/interface";
import OrderModel, { orderDTO, OrderStatus } from "../models/order.model";
import response from "../utils/response";

export default {
  async create(req: Request, res: Response) {
    try {
      await orderDTO.validate(req.body);
      const result = await OrderModel.create(req.body);

      response.success(res, result, "Success create order");
    } catch (error) {
      response.error(res, error, "Failed create order");
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
              cust: { $regex: search, $options: "i" },
            },
            {
              orderStatus: { $regex: search, $options: "i" },
            },
          ],
        });
      }

      const result = await OrderModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      if (!result) return response.notFound(res, "Order not found!");

      const total = await OrderModel.countDocuments(query);

      response.pagination(
        res,
        result,
        { total, totalPage: Math.ceil(total / limit), current: page },
        "Success find all Order"
      );
    } catch (error) {
      response.error(res, error, "Failed findAll order");
    }
  },
  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Id not found");
      }

      const result = await OrderModel.findByIdAndDelete(id, {
        new: true,
      });

      if (!result) return response.notFound(res, "Order not found");

      response.success(res, result, "Success delete Order");
    } catch (error) {
      response.error(res, error, "Failed delete order");
    }
  },

  async processing(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Id not found");
      }

      const order = await OrderModel.findById(id);

      if (!order) return response.notFound(res, "Order not found!");

      if (order.orderStatus == OrderStatus.PROCESSING)
        return response.error(res, null, "You have been processing this order");

      const result = await OrderModel.findByIdAndUpdate(
        id,
        { orderStatus: OrderStatus.PROCESSING },
        {
          new: true,
        }
      );

      if (!result) return response.notFound(res, "Order not found");

      response.success(res, result, "Success processing Order");
    } catch (error) {
      response.error(res, error, "Failed processing order");
    }
  },
  async completed(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Id not found");
      }

      const order = await OrderModel.findById(id);

      if (!order) return response.notFound(res, "Order not found!");

      if (order.orderStatus == OrderStatus.COMPLETE)
        return response.error(res, null, "You have been completed this order");

      const result = await OrderModel.findByIdAndUpdate(
        id,
        { orderStatus: OrderStatus.COMPLETE },
        {
          new: true,
        }
      );

      if (!result) return response.notFound(res, "Order not found");

      response.success(res, result, "Success completed Order");
    } catch (error) {
      response.error(res, error, "Failed completed order");
    }
  },
  async cancelled(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Id not found");
      }

      const order = await OrderModel.findById(id);

      if (!order) return response.notFound(res, "Order not found!");

      if (order.orderStatus == OrderStatus.CANCELLED)
        return response.error(res, null, "You have been cancelled this order");

      const result = await OrderModel.findByIdAndUpdate(
        id,
        { orderStatus: OrderStatus.CANCELLED },
        {
          new: true,
        }
      );

      if (!result) return response.notFound(res, "Order not found");

      response.success(res, result, "Success cancelled Order");
    } catch (error) {
      response.error(res, error, "Failed cancelled order");
    }
  },
};
