import Categories from '../Models/CategoryModel.js';
import expressAsyncHandler from 'express-async-handler';
import { categories } from '../data.js';

// @desc import categories
// @route POST /api/categories/import
// @access Private

const importCategories = expressAsyncHandler(async (req, res) => {
  try {
    // remove all categories
    await Categories.deleteMany({});
    // insert new categories
    const createdCategories = await Categories.insertMany(categories);
    res.status(201).json(createdCategories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Create a new category
// @route POST /api/categories
// @access Private

const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { name, image } = req.body;

    // find if category exists
    const existsCat = await Categories.findOne({ name });
    if (existsCat) {
      res.status(400).json({ message: 'Categories already exists' });
    } else {
      const category = new Categories({
        name,
        image,
      });

      const createdCategory = await category.save();

      res.status(201).json(createdCategory);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all categories
// @route GET /api/categories
// @access Public

const getCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update a category
// @route PUT /api/categories/:id
// @access Private

const updateCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = await Categories.findById(req.params.id);

    if (category) {
      category.name = name || category.name;
      category.image = image || category.image;

      const updatedCategory = await category.save();

      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Categories not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Private

const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);

    if (category) {
      res.json({ message: 'Categories removed' });
    } else {
      res.status(404).json({ message: 'Categories not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  importCategories,
};
