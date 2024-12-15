// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const data= req.body ;
    data.user=req.user._id;
    const result=await createNewOrderRepo(data);
    res.status(201).send("Order Placed");
  }catch(error){
    if(error instanceof(ErrorHandler)){
      next(error);
    }
    return next(new ErrorHandler(500, error));
  }
 
  
};
