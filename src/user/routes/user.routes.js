// Please don't change the pre-written code
// Import the necessary modules here

import express from "express";
import {
  createNewUser,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getUserDetails,
  getUserDetailsForAdmin,
  logoutUser,
  resetUserPassword,
  updatePassword,
  updateUserProfile,
  updateUserProfileAndRole,
  userLogin,
} from "../controller/user.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";

const router = express.Router();

// // User POST Routes
// router.route("/signup").post(createNewUser);
// router.route("/login").post(userLogin);
// router.route("/password/forget").post(forgetPassword);

// // User PUT Routes
// router.route("/password/reset/:token").put(resetUserPassword);
// router.route("/password/update").put(auth, updatePassword);
// router.route("/profile/update").put(auth, updateUserProfile);

// // User GET Routes
// router.route("/details").get(auth, getUserDetails);
// router.route("/logout").get(auth, logoutUser);

// // Admin GET Routes
// router.route("/admin/allusers").get(auth, authByUserRole("admin"), getAllUsers);
// router
//   .route("/admin/details/:id")
//   .get(auth, authByUserRole("admin"), getUserDetailsForAdmin);

// // Admin DELETE Routes
// router
//   .route("/admin/delete/:id")
//   .delete(auth, authByUserRole("admin"), deleteUser);

// // Admin PUT Routes
// // Implement route for updating role of other users
// // Write your code here
// router
//   .route("/admin/update/:id")
//   .put(auth, authByUserRole("admin"), updateUserProfileAndRole);




/**
 * @swagger
 * /api/storefleet/user/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Email already registered or invalid input
 */
router.route("/signup").post(createNewUser);

/**
 * @swagger
 * /api/storefleet/user/login:
 *   post:
 *     summary: User login
 *     description: Authenticate the user and generate a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, token generated
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid email or password
 */
router.route("/login").post(userLogin);

/**
 * @swagger
 * /api/storefleet/user/password/forget:
 *   post:
 *     summary: Request password reset
 *     description: Send a password reset email to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: User does not exist
 */
router.route("/password/forget").post(forgetPassword);

// User PUT Routes
/**
 * @swagger
 * /api/storefleet/user/password/reset/{token}:
 *   put:
 *     summary: Reset user password
 *     description: Reset the user's password using a valid token.
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or password mismatch
 */
router.route("/password/reset/:token").put(resetUserPassword);

/**
 * @swagger
 * /api/storefleet/user/password/update:
 *   put:
 *     summary: Update user password
 *     description: Update the current user's password.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid password or mismatch
 */
router.route("/password/update").put(auth, updatePassword);

/**
 * @swagger
 * /api/storefleet/user/profile/update:
 *   put:
 *     summary: Update user profile
 *     description: Update the current user's profile details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid profile details
 */
router.route("/profile/update").put(auth, updateUserProfile);

// User GET Routes
/**
 * @swagger
 * /api/storefleet/user/details:
 *   get:
 *     summary: Get user details
 *     description: Get the current user's details.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *       401:
 *         description: Unauthorized
 */
router.route("/details").get(auth, getUserDetails);

/**
 * @swagger
 * /api/storefleet/user/logout:
 *   get:
 *     summary: User logout
 *     description: Log the user out and invalidate the token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.route("/logout").get(auth, logoutUser);

// Admin GET Routes
/**
 * @swagger
 * /api/storefleet/user/admin/allusers:
 *   get:
 *     summary: Get all users (Admin)
 *     description: Retrieve a list of all users in the system (Admin only).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.route("/admin/allusers").get(auth, authByUserRole("admin"), getAllUsers);

/**
 * @swagger
 * /api/storefleet/user/admin/details/{id}:
 *   get:
 *     summary: Get user details for admin
 *     description: Retrieve details of a specific user by ID (Admin only).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *       400:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.route("/admin/details/:id").get(auth, authByUserRole("admin"), getUserDetailsForAdmin);

// Admin DELETE Routes
/**
 * @swagger
 * /api/storefleet/user/admin/delete/{id}:
 *   delete:
 *     summary: Delete a user (Admin)
 *     description: Delete a specific user by ID (Admin only).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to be deleted
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *       400:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.route("/admin/delete/:id").delete(auth, authByUserRole("admin"), deleteUser);

// Admin PUT Routes
/**
 * @swagger
 * /api/storefleet/user/admin/update/{id}:
 *   put:
 *     summary: Update user profile and role (Admin)
 *     description: Update the profile and role of a specific user by ID (Admin only).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *                 enum:
 *                   - user
 *                   - admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated user profile and role
 *       400:
 *         description: Invalid input or user not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.route("/admin/update/:id").put(auth, authByUserRole("admin"), updateUserProfileAndRole);





export default router;
