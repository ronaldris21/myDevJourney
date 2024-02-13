import Products from '../Models/ProductsModel.js';
import expressAsyncHandler from 'express-async-handler';
import { products } from '../data.js';

// @desc import products
// @route POST /api/products/import
// @access Private

const importProducts = expressAsyncHandler(async (req, res) => {
  try {
    // delete all products
    await Products.deleteMany({});
    // insert products
    const createdProducts = await Products.insertMany(products);
    res.status(201).json(createdProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Create a new product
// @route POST /api/products
// @access Private

const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { title, image, price, description, category, tags, salesOffer } =
      req.body;

    const product = new Products({
      title,
      image,
      price,
      description,
      category,
      tags,
      salesOffer,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all products
// @route GET /api/products
// @access Public

const getProducts = expressAsyncHandler(async (req, res) => {
  try {
    const { category, search, sort, tag } = req.query;
    const pageSize = 10;
    const pageNumber = Number(req.query.pageNumber) || 1;

    // sort newest to oldest, oldest to newest
    const order = sort === 'newest' ? -1 : sort === 'oldest' ? 1 : -1;

    // filter by tags
    const tagsFilter = tag ? { tags: { $in: tag } } : {};

    // search by title
    const title = search
      ? {
          title: {
            $regex: search,
            $options: 'i',
          },
        }
      : {};

    // filter by category
    const categoryFilter = category ? { category } : {};

    // count total products
    const count = await Products.countDocuments({
      ...title,
      ...categoryFilter,
      ...tagsFilter,
    });
    // get products
    const products = await Products.find({
      ...title,
      ...categoryFilter,
      ...tagsFilter,
    })
      .sort({ createdAt: order })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1));

    // get offer products
    const offers = await Products.aggregate([
      { $match: { 'salesOffer.status': true } },
      { $sample: { size: 10 } },
    ]);

    // send products, page number, and total pages
    res.json({
      products,
      page: pageNumber,
      pages: Math.ceil(count / pageSize),
      offers,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get product by id
// @route GET /api/products/:id
// @access Public

const getProductById = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    // get related products
    const relatedProducts = await Products.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(3);
    if (product) {
      res.json({
        product,
        relatedProducts,
      });
    } else {
      res.status(404).json({ message: 'product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private

const updateProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { title, image, price, description, category, tags, salesOffer } =
      req.body;

    const product = await Products.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.image = image || product.image;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.tags = tags || product.tags;
      product.salesOffer = salesOffer || product.salesOffer;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private

const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'product removed' });
    } else {
      res.status(404).json({ message: 'product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all popular products tags
// @route GET /api/products/all/tags
// @access Public

const getPopularTags = expressAsyncHandler(async (req, res) => {
  try {
    // every product has a tags array of strings
    // get most used tags
    const tags = await Products.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    res.json(tags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// export

export {
  importProducts,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getPopularTags,
};
