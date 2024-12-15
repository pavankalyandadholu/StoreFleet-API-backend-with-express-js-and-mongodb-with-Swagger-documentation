import express from "express";
import dotenv from "dotenv";
import path from "path";
import productRoutes from "./src/product/routes/product.routes.js";
import {
  errorHandlerMiddleware,
  handleUncaughtError,
} from "./middlewares/errorHandlerMiddleware.js";
import userRoutes from "./src/user/routes/user.routes.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./src/order/routes/order.routes.js";

const configPath = path.resolve("backend", "config", "uat.env");
import { setupSwagger } from "./swagger.js";
dotenv.config({ path: configPath });

const app = express();
app.use(express.json());
app.use(cookieParser());
setupSwagger(app);
// configure routes
app.use("/api/storefleet/product", productRoutes);
app.use("/api/storefleet/user", userRoutes);
app.use("/api/storefleet/order", orderRoutes);
app.get('/',(req,res)=>{
  res.status(200).send("Welcome to StoreFleet API's")
})
// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;
