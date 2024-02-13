import express from "express";
import asyncHandler from "express-async-handler";
import { Product, Review } from "./../Models/ProductModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";
import { SchemaValidator } from "../Middleware/SchemaValidator.js";
import UploadImagesMulter from "./../utils/UploadImagesMulter.js"
import { MultimediaModel } from "../Models/MultimediaModel.js";
import fs from "fs";
import { error } from "console";

const productRoute = express.Router();

// GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const pageSize = 12;
      const page = Number(req.query.pageNumber) || 1;
      const keyword = req.query.keyword
        ? {
            $or: [
              {
                name: {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
              {
                description: {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
              {
                category: {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
              {
                "plans.basic.includes": {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
              {
                "plans.basic.description": {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
              {
                "plans.standard.includes": {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
              {
                "plans.standard.description": {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
              {
                "plans.premium.includes": {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
              {
                "plans.premium.description": {
                  $regex: new RegExp(req.query.keyword, "i"),
                },
              },
            ],
          }
        : {};

      const products = await Product.find(keyword)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });

      const count = products.length;
      console.table(["coincidencias", count, req.query.keyword]);
      // or
      // $or [{}, {}, {}]
      // db.inspections.find({
      //   $or: [
      //     { sector: "Tax Preparers - 891" },
      //     { result: "Unable to Locate" }
      //   ]
      // }).count()
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      next(error);
    }
  })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res, next) => {
    try {
      const products = await Product.find({}).sort({ _id: -1 });
      // .populate({ path: 'multimedia', model: 'Multimedia' });
      // .populate("Multimedia").sort({ _id: -1 });
      res.json(products);
    } catch (error) {
      next(error);
    }
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404);
        throw new Error("Product not Found");
      }
    } catch (error) {
      next(error);
    }
  })
);

// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      console.log("/"+req.params.id+"/review");
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.id);

      if (product) {
        // const alreadyReviewed = product.reviews.find(
        //   (r) => r.user.toString() === req.user._id.toString()
        // );
        // if (alreadyReviewed) {
        //   res.status(400);
        //   throw new Error("Product already Reviewed");
        // }
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Reviewed Added" });
      } else {
        res.status(404);
        throw new Error("Product not Found");
      }
    } catch (error) {
      next(error);
    }
  })
);

// DELETE PRODUCT
productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        product?.multimedia?.map(async (imageId) => {
          await MultimediaModel.remove({ _id: imageId });
        });

        await product.remove();
        res.json({ message: "Product deleted" });
      } else {
        res.status(404);
        throw new Error("Product not Found");
      }
    } catch (error) {
      next(error);
    }
  })
);

// CREATE PRODUCT
productRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res, next) => {
    try {
      const { newProduct } = req.body;
      const name = newProduct.name;
      const productExist = await Product.findOne({ name });
      if (productExist) {
        console.error("PRODUCTO EXISTENTE");
        res.status(400);
        throw new Error("Product name already exist");
      } else {
        const product = new Product({
          ...newProduct,
        });
        if (product) {
          const createdproduct = await product.save();
          res.status(201).json(createdproduct);
        } else {
          res.status(400);
          throw new Error("Invalid product data");
        }
      }
    } catch (error) {
      next(error);
    }
  })
);

productRoute.get("/image/:idImage", async (req, res, next) => {
  try {
    const idImage = req.params.idImage;
    const image = MultimediaModel.findById(idImage);
    if (image == null) {
      res.status(404);
      throw new Error("Image not found");
    }
    res.json(image);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

/// POST IMAGE IN PRODUCT
productRoute.post(
  "/upload/:idService",
  protect,
  admin,
  UploadImagesMulter.single("photo"),
  async (req, res, next) => {
    try {
      const file = req.file;
      const { filename } = req.file;
      const idService = req.params.idService;
      console.log(`/upload/${idService} ENTRÓ`);
      console.log([file, filename, idService]);

      if (!idService || !filename) {
        res.status(401).json({ status: 401, message: "Datos incompletos" });
        return;
      }

      const image = MultimediaModel({
        data: fs.readFileSync("uploads/" + filename),
        mimetype: file.mimetype,
      });

      ///guardo la imagen
      const savedImage = await image.save().catch((error) => {
        console.log("No se pudo guardar la imagen en mongodb");
        next(error);
        return;
      });

      console.log("Image is saved succefully on mongo");
      ///Ahora proceo  eliminar la imagen los archivos locales
      const imgPath = "uploads/" + filename;
      fs.unlink(imgPath, (error) => {
        if (error) {
          console.log("Error al eliminar la imagen");
          console.log(error);
        } else {
          console.log("\tImagen Borrada");
        }
      });

      ///Asocio la imagen al servicio
      await Product.updateOne(
        { _id: idService },
        {
          $push: {
            multimedia: savedImage._id,
          },
        }
      );
      console.log("Imagen Asociada al producto");

      res.status(200).json(savedImage);
    } catch (error) {
      console.log("Fallo /upload");
      console.log(error);
      next(error);
    }
  }
);

/// REMOVE IMAGE IN PRODUCT
productRoute.delete(
  "/:idService/remove-image/:idImage",
  async (req, res, next) => {
    try {
      const idService = req.params.idService;
      const idImage = req.params.idImage;
      console.log("DELETE IMAGE");
      console.log([idImage, idService]);

      if (!idService || !idImage) {
        res.status(401).json({ status: 401, message: "Datos incompletos" });
        return;
      }

      const product = await Product.findById(idService);
      if (product) {
        await product.removeMultimedia(idImage);
      }

      ///ELIMINO la imagen al servicio
      await Product.updateOne(
        { _id: idService },
        {
          $pull: {
            multimedia: idImage,
          },
        }
      );
      console.log("Imagen ELIMINADA del producto");

      await MultimediaModel.findByIdAndRemove(idImage);
      console.log("Imagen ELIMINADA del multimedia");

      res.status(200).send("Image Borrada");
    } catch (error) {
      console.log("Fallo /upload");
      console.log(error);
      next(error);
    }
  }
);

/// POST IMAGE IN PRODUCT
productRoute.post(
  "/upload/:id",
  UploadImagesMulter.single("photo"),
  async (req, res, next) => {
    try {
      const file = req.file;
      const { filename } = req.file;
      const idService = req.params.id;
      console.log(`/upload/${idService} ENTRÓ`);
      console.log([file, filename, idService]);

      if (!idService || !filename) {
        res.status(401).json({ status: 401, message: "Datos incompletos" });
        return;
      }

      const image = MultimediaModel({
        data: fs.readFileSync("uploads/" + filename),
        mimetype: file.mimetype,
      });

      ///guardo la imagen
      const savedImage = await image.save().catch((error) => {
        console.log("No se pudo guardar la imagen en mongodb");
        next(error);
        return;
      });

      console.log("Image is saved succefully on mongo");
      ///Ahora proceo  eliminar la imagen los archivos locales
      const imgPath = "uploads/" + filename;
      fs.unlink(imgPath, (error) => {
        if (error) {
          console.log("Error al eliminar la imagen");
          console.log(error);
        } else {
          console.log("\tImagen Borrada");
        }
      });

      ///Asocio la imagen al servicio
      await Product.updateOne(
        { _id: idService },
        {
          $push: {
            multimedia: savedImage._id,
          },
        }
      );
      console.log("Imagen Asociada al producto");

      res.status(200).json(savedImage);
    } catch (error) {
      console.log("Fallo /upload");
      console.log(error);
      next(error);
    }
  }
);

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res, next) => {
    try {
      const { editProduct } = req.body;
      const productId = req.params.id;
      console.log("Update product: " + productId);

      // Exclude the _id field from the update operation
      const updateData = { ...editProduct };
      const result = await Product.findByIdAndUpdate(productId, updateData, {
        new: true, //// Set the `new` option to true to return the updated document
      });
      // const result = await Product.updateOne({ _id: productId }, updateData);
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  })
);

// UPDATE MAIN IMAGE PRODUCT
productRoute.put(
  "/:idService/mainImage/:idImage",
  // // protect,
  // // admin,
  asyncHandler(async (req, res, next) => {
    try {
      const { editProduct } = req.body;
      const idService = req.params.idService;
      const idImage = req.params.idImage;
      console.log("Update product: " + idService);

      const productOld = await Product.findById(idService);
      productOld.image = idImage;

      const result = await Product.findByIdAndUpdate(idService, productOld, {
        new: true, //// Set the `new` option to true to return the updated document
      });
      // const result = await Product.updateOne({ _id: productId }, updateData);
      console.log(result);
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  })
);
export default productRoute;
