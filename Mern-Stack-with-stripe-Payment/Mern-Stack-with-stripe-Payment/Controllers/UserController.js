import bcrypt from 'bcryptjs';
import User from '../Models/UserModel.js';
import Order from '../Models/OrderModel.js';
import expressAsyncHandler from 'express-async-handler';
import { users } from '../data.js';
import { generateToken } from '../middleware/Auth.js';

// @desc    import users
// @route   POST /api/users/import
// @access  Private

const importUsers = expressAsyncHandler(async (req, res) => {
  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);
  res.status(201).json(createdUsers);
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public

const login = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user by email
    const user = await User.findOne({ email });
    // if user exists
    if (user) {
      // compare password
      if (bcrypt.compareSync(password, user.password)) {
        res.json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          image: user.image,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error('Invalid Password');
      }
    } else {
      res.status(401);
      throw new Error('Invalid Email');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  @desc    Update user profile
//  @route   PUT /api/users
//  @access  Private

const updateProfile = expressAsyncHandler(async (req, res) => {
  try {
    // find user by id
    const user = await User.findById(req.user._id);
    // if user exists update user
    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.image = req.body.image || user.image;
      // save user
      const updatedUser = await user.save();
      // send response
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        image: updatedUser.image,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  @desc    Change user password
//  @route   PUT /api/users/password
//  @access  Private

const changePassword = expressAsyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    //  find user by id
    const user = await User.findById(req.user._id);
    // if old password matches new password
    if (user) {
      if (bcrypt.compareSync(oldPassword, user.password)) {
        user.password = bcrypt.hashSync(newPassword, 10);
        // save user
        await user.save();
        // send response
        res.json({
          message: 'Password updated successfully',
        });
      } else {
        res.status(401);
        throw new Error('Invalid old password');
      }
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  @desc    Delete user
//  @route   DELETE /api/users
//  @access  Private

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    // find user by id
    const user = await User.findByIdAndDelete(req.user._id);
    // if user exists
    if (user) {
      // delete user orders
      await Order.deleteMany({ user: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    // find user by email
    const existsUser = await User.findOne({ email });
    // if user exists
    if (existsUser) {
      res.status(400);
      throw new Error('User already exists');
    }
    // create new user
    else {
      const user = await User.create({
        fullName,
        email,
        phone,
        password: bcrypt.hashSync(password, 10),
      });
      // send response
      if (user) {
        res.status(201).json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          image: user.image,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// export
export {
  importUsers,
  login,
  updateProfile,
  changePassword,
  deleteUser,
  registerUser,
};
