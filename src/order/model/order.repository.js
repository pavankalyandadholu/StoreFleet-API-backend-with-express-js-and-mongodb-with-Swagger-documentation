import OrderModel from "./order.schema.js";
import mongoose from "mongoose";
import ProductModel from "../../product/model/product.schema.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  const session = await mongoose.startSession(); 
  session.startTransaction();
  try {
    // create order
  await createOrder(data,session);
}catch(error) {
  // If any error occurs, abort the transaction
  await session.abortTransaction();
  session.endSession();
  throw new ErrorHandler(400,error.message);
}
  
};

async function  createOrder(data, session){
  const newOrder= new OrderModel(data);

  // find product
  const products=data.orderedItems;
   await products.forEach(async (prod) => {
        const product= await ProductModel.findById(prod.product).session(session);
        if(!product){
  //         
          throw new Error(`${prod.name} product is not exist to place order .`)
        
        }
        if(product.stock-prod.quantity>=0){
          product.stock=product.stock-prod.quantity;
          await  product.save({session})
        }else{
  //         
          throw new Error(`${prod.name} product is out of Stock `)
        }
        
    });

  await newOrder.save({session})
  await session.commitTransaction();
  session.endSession();
}
