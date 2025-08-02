import { Request, Response } from "express";
import UserModel, { userLoginDTO } from "../models/user.model";
import response from "../utils/response";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../utils/interface";

export default {
  async login(req: Request, res: Response) {
    try {
      // ambil data dari req.body
      const { identifier, password } = req.body;

      // validasi input req.body
      await userLoginDTO.validate({ identifier, password });

      // ambil data User berdasarkan identifier dan isActive status nya
      const userByIdentifier = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        isActive: true,
      });

      if (!userByIdentifier)
        return response.unauthorized(res, "User not found");

      // validasi input password dengan password user
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validatePassword)
        return response.unauthorized(res, "Wrong Password!");

      // Jika lolos validasi maka Generta Token jwt
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      response.success(res, token, "Login Success");
    } catch (error) {
      return response.error(res, error, "Failed to login!");
    }
  },

  async checkMe(req: IReqUser, res: Response) {
    try {
      // Ambil data user berdasarkan token
      const user = req.user;

      // Cari data user berdasarkan id di mongoDb user
      const result = await UserModel.findById(user?.id);

      if (!result) return response.unauthorized(res, "User not found!");

      // Jika data user ditemukan, return data user
      response.success(res, result, "Success get user profile!");
    } catch (error) {
      // jika data tidak valid, return error
      response.error(res, error, "User not found!");
    }
  },

  async activation(req: Request, res: Response) {
    try {
      const { code } = req.body as { code: string };

      const user = await UserModel.findOneAndUpdate(
        { activationCode: code },
        {
          isActive: true,
        },
        {
          new: true,
        }
      );

      if (!user) return response.unauthorized(res, "User not found");

      response.success(res, user, "User successfully activated");
    } catch (error) {
      // jika data tidak valid, return error
      response.error(res, error, "Failed Activated");
    }
  },
};
