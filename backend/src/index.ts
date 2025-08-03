import express from "express";
import connectMongoDB from "./db/connectMongoDB";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./utils/env";

import AuthRoute from "./routes/auth.routes";
import MediaRoute from "./routes/media.routes";
import UserRoute from "./routes/user.routes";
import CategoryRoute from "./routes/category.routes";
import MenuRoute from "./routes/menu.routes";
import ReviewRoute from "./routes/review.routes";
import OrderRoute from "./routes/order.routes";
import VoucherRoute from "./routes/voucher.routes";

async function init() {
  try {
    const db = await connectMongoDB();
    console.log("Database Status: ", db);

    const app = express();
    app.use(cors());
    app.use(bodyParser.json()); // Untuk membaca json dari req.body
    app.use(express.urlencoded({ extended: true })); // (Opsional) Untuk form-data

    // Base Route API
    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Welcome to API for App POS Coffee by Andika Syamsiana ☕",
      });
    });
    // Import and Use Route API
    app.use("/api", [
      AuthRoute,
      MediaRoute,
      UserRoute,
      CategoryRoute,
      MenuRoute,
      ReviewRoute,
      OrderRoute,
      VoucherRoute,
    ]);

    // Running Server
    app.listen(PORT, async () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
