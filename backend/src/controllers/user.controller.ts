import { Request, Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interface";
import response from "../utils/response";
import UserModel, { TypeUser, userDTO } from "../models/user.model";
import { FilterQuery, isValidObjectId } from "mongoose";

export default {
  async findAll(req: IReqUser, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query: FilterQuery<TypeUser> = {};

      if (search) {
        Object.assign(query, {
          ...query,
          $text: {
            $search: search,
          },
        });
      }

      const result = await UserModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      if (!result) {
        return response.notFound(res, "No User found!");
      }

      const count = await UserModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          total: count,
          current: page,
          totalPage: Math.ceil(count / limit),
        },
        "User retrieved successfully"
      );
    } catch (error) {
      response.error(res, error, "Failed to find all User");
    }
  },

  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "User not found");
      }

      const result = await UserModel.findById(id);

      if (!result) {
        return response.notFound(res, "User not found");
      }

      response.success(res, result, "User retrieved successfully");
    } catch (error) {
      response.error(res, error, "failed to find user");
    }
  },

  async create(req: Request, res: Response) {
    // ambil data dari req.body
    const { fullname, username, email, password, confirmPassword, role } =
      req.body;

    try {
      // validasi data
      await userDTO.validate({
        fullname,
        username,
        email,
        password,
        confirmPassword,
        role,
      });

      const result = await UserModel.create({
        fullname,
        username,
        email,
        password,
        role,
      });

      // proses register user
      response.success(res, result, "Success Create User!");
    } catch (error) {
      response.error(res, error, "Failed Registration");
    }
  },

  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "User not found!");
      }

      const result = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) {
        return response.notFound(res, "User not found!");
      }

      response.success(res, result, "User updated successfully");
    } catch (error) {
      response.error(res, error, "Failed to update user");
    }
  },

  async delete(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        response.notFound(res, "User not found!");
      }

      const result = await UserModel.findByIdAndDelete(id, { new: true });

      if (!result) {
        return response.notFound(res, "User not found!");
      }

      response.success(res, result, "User deleted successfully");
    } catch (error) {
      response.error(res, error, "Failed to delete user");
    }
  },
};
