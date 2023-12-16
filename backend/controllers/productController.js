import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  //   const pageSize = 2;
  //   const page = Number(req.query.pageNumber) || 1;
  //   const keyword = req.query.keyword
  //     ? {
  //         // This is a MongoDB operator. It's similar to the LIKE operator in SQL.
  //         name: {
  //           $regex: req.query.keyword, // $regex is the MongoDB operator for regular expressions
  //           $options: "i", // $options: "i" means that it's case insensitive
  //         },
  //       }
  //     : {};
  //   const count = await Product.countDocuments({ ...keyword });
  //   const products = await Product.find({ ...keyword })
  //     .limit(pageSize)
  //     .skip(pageSize * (page - 1));
  //   res.json({ products, page, pages: Math.ceil(count / pageSize) });
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404); // 404 is the status code for Not Found
    throw new Error("Resource not found");
  }
});

export { getProductById, getProducts };
