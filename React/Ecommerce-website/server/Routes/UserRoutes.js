import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";
import { SchemaValidator } from "../Middleware/SchemaValidator.js";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
          createdAt: user.createdAt,
        });
      } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
    } catch (error) {
      next(error);
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  SchemaValidator(User),
  asyncHandler(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      console.log(user);
      var tokenGenerado = generateToken(user._id);

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: tokenGenerado,
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    } catch (error) {
      next(error);
    }
  })
);

/////No hace nada xddd
userRouter.get(
  "/error",
  ////MIDDLEWARE
  async (req, res, next) => {
    try {
      ///TODO: backend cuando falla una peticion, SE MUERE TODO EL BACKEND!!
      ///TODO: NECESITO UN MIDDLEWARE QUE ADMINSTRE LOS ERRORES CORRECTAMENTE!
      res.status(400);
      throw new Error("ERROR INTENCIONAL PARA PRUEBA DE MIDDLEWARES!");
      res.send("WELL DONE!");
    } catch (error) {
      next(error);
    }
  }
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.creWatedAt,
        });
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      next(error);
    }
  })
);

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 */
// PROFILE
userRouter.get(
  "/all",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      const users = await User.find({}).sort({ _id: -1 });
      res.json(users);
    } catch (error) {
      next(error);
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          createdAt: updatedUser.createdAt,
          token: generateToken(updatedUser._id),
        });
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      next(error);
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      next(error);
    }
  })
);


//TODO: BORRAR
// GET ALL USER ADMIN
userRouter.get(
  "/USERSALL",
  asyncHandler(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      next(error);
    }
  })
);

export default userRouter;
