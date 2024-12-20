// Please don't change the pre-written code
// Import the necessary modules here
import bcrypt from 'bcryptjs'
// import { compareSync } from "bcryptjs";
import { sendPasswordResetEmail } from "../../../utils/emails/passwordReset.js";
import { sendWelcomeEmail } from "../../../utils/emails/welcomeMail.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import { sendToken } from "../../../utils/sendToken.js";
import {
  createNewUserRepo,
  deleteUserRepo,
  findUserForPasswordResetRepo,
  findUserRepo,
  getAllUsersRepo,
  updateUserProfileRepo,
  updateUserRoleAndProfileRepo,
} from "../models/user.repository.js";

export const createNewUser = async (req, res, next) => {
  try {
    const newUser = await createNewUserRepo(req.body);
    // await sendToken(newUser, res, 200);

    // Implement sendWelcomeEmail function to send welcome message
    // await sendWelcomeEmail(newUser);
    res.status(201).send("Registration Successfull! ")

  } catch (err) {
    //  handle error for duplicate email
    if (err.code === 11000 && err.keyPattern.email) {
      // This error occurs when a duplicate key is found for the email field
     return next(new ErrorHandler(400, 'Email already registered'));
    }
    return next(new ErrorHandler(400, err));
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler(400, "please enter email/password"));
    }
    const user = await findUserRepo({ email }, true);
    if (!user) {
      return next(
        new ErrorHandler(401, "user not found! register yourself now!!")
      );
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Invalid email or passswor!"));
    }
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

export const forgetPassword = async (req, res, next) => {
  // Implement feature for forget password
  try {
    const user=await findUserRepo({email:req.body.email});
    if(!user){
      return next( new ErrorHandler(400,"User does not exist to Reset Password"))
    }
    const updatedUser =await  user.getResetPasswordToken();
    
     await updatedUser.save()
    sendPasswordResetEmail(user)
    res.status(200).send("Mail send successfully to reset Password!  ")
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(500, error));
  }



 
};

export const resetUserPassword = async (req, res, next) => {
  // Implement feature for reset password
  try {
    const token= req.params.token;
    
    const user=await findUserForPasswordResetRepo(token);
if(!user){
 return next( new ErrorHandler(400,"Reset token is expired . "))
}   
 if(req.body.password=== req.body.confirmPassword){
    const oldPassword= req.body.password;
    user.password= await bcrypt.hash(oldPassword,12);
    await user.save();
    res.status(200).send("Password reset Successfully!")
  }else{

    next(new ErrorHandler(400,"password and confirmpassword are not match! "))
  }

  } catch (error) {
    return next(new ErrorHandler(500, error));
  }



};

export const getUserDetails = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.user._id });
  res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    if (!currentPassword) {
      return next(new ErrorHandler(401, "pls enter current password"));
    }

    const user = await findUserRepo({ _id: req.user._id }, true);
    const passwordMatch = await user.comparePassword(currentPassword);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Incorrect current password!"));
    }

    if (!newPassword || newPassword !== confirmPassword) {
      return next(
        new ErrorHandler(401, "mismatch new password and confirm password!")
      );
    }

    user.password = newPassword;
    await user.save();
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateUserProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUserDetails = await updateUserProfileRepo(req.user._id, {
      name,
      email,
    });
    res.status(201).json({ success: true, updatedUserDetails });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// admin controllers
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsersRepo();
    res.status(200).json({ success: true, allUsers });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const getUserDetailsForAdmin = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.params.id });
    if (!userDetails) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserRepo(req.params.id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }

    res
      .status(200)
      .json({ success: true, msg: "user deleted successfully", deletedUser });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateUserProfileAndRole = async (req, res, next) => {
  // Write your code here for updating the roles of other users by admin

  try {
    const userId= req.params.id;
  const data=req.body;
   const result=  await updateUserRoleAndProfileRepo(userId,data);
   if(result){
     res.status(200).send("Role is update Successfully! ")

   }else{
    next(new ErrorHandler(400,"User not found to update Role and profile"));
   }
    
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
 

};
