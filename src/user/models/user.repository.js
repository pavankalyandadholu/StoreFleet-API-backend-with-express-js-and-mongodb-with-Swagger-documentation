import UserModel from "./user.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "bson";
import bcrypt from 'bcryptjs'

export const createNewUserRepo = async (user) => {
  const oldPassword= user.password;
    user.password= await bcrypt.hash(oldPassword,12);
    
  const newuser = new UserModel(user).save();
  return newuser
 
};

export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) return await UserModel.findOne(factor).select("+password");
  else return await UserModel.findOne(factor);
};

export const findUserForPasswordResetRepo = async (hashtoken) => {
  return await UserModel.findOne({
    resetPasswordToken: hashtoken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};

export const updateUserProfileRepo = async (_id, data) => {
  return await UserModel.findOneAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

export const getAllUsersRepo = async () => {
  return UserModel.find({});
};

export const deleteUserRepo = async (_id) => {
  return await UserModel.findByIdAndDelete(_id);
};

export const updateUserRoleAndProfileRepo = async (_id, data) => {
  // Write your code here for updating the roles of other users by admin
   const user= await UserModel.findById(new ObjectId(_id));
   if(!user){
    return false;
   }
   if(data.name){
      user.name=data.name;
   }
   if(data.email){
      user.email=data.email;
   }
   if(data.role){
      user.role=data.role;
   }
   await user.save();
   return true;
   
  
};
