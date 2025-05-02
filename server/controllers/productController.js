const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidation");
const path = require("path");
const fs = require("fs");

const getProducts = async (req, res, next) => {
  try {
    // pagination
    const pageNum = Number(req.query.pageNum) || 1;

    // sort
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      const [key, value] = sortOption.split("_");
      sort = { [key]: Number(value) };
    }

    let query = {};
    let isFiltered = false;
    // filter price
    let priceQueryCondition = {};
    if (req.query.price) {
      isFiltered = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    // filter rating
    let ratingQueryCondition = {};
    if (req.query.rating) {
      // console.log(req.query.rating);
      isFiltered = true;
      let ratingFilter = req.query.rating
        .split(",")
        .filter((r) => r !== "")
        .map((r) => ({
          rating: { $gte: parseInt(r), $lt: parseInt(r) + 1 },
        }));
      // console.log("ratingFilter", ratingFilter)
      ratingQueryCondition = { $or: ratingFilter };
    }

    // category from header
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      isFiltered = true;
      let a = categoryName.replaceAll(",", "|");
      var regEx = new RegExp("^" + a, "i");
      categoryQueryCondition = { category: regEx };
    }

    // filtered Category
    if (req.query.category) {
      isFiltered = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item, "i");
      });
      categoryQueryCondition = {
        category: { $in: a },
      };
    }

    // attributes filter
    let attrsQueryCondition = {};
    if (req.query.attrs) {
      isFiltered = true;

      let attrsFilter = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let itemArr = item.split("-");
          let values = [...itemArr];
          values.shift();
          let queryObj = {
            attrs: { $elemMatch: { key: itemArr[0], value: { $in: values } } },
          };
          acc.push(queryObj);
        }
        return acc;
      }, []);
      attrsQueryCondition = { $or: attrsFilter };
      console.dir(attrsQueryCondition, { depth: null });
    }

    // search box
    let searchQueryCondition = {};
    let select = {};
    const searchQuery = req.params.searchQuery || "";
    if (searchQuery) {
      isFiltered = true;
      // searchQueryCondition = { $text: { $search: searchQuery } };
      searchQueryCondition = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      };
      // select = {
      //   score: { $meta: "textScore" },
      // };
      // sort = select;
    }

    if (isFiltered) {
      let andConditions = [];

      if (Object.keys(priceQueryCondition).length > 0)
        andConditions.push(priceQueryCondition);
      if (Object.keys(ratingQueryCondition).length > 0)
        andConditions.push(ratingQueryCondition);
      if (Object.keys(categoryQueryCondition).length > 0)
        andConditions.push(categoryQueryCondition);
      if (Object.keys(attrsQueryCondition).length > 0)
        andConditions.push(attrsQueryCondition);
      if (Object.keys(searchQueryCondition).length > 0)
        andConditions.push(searchQueryCondition);

      if (andConditions.length > 0) {
        query = { $and: andConditions };
      }
    }
    // await Product.collection.createIndex(
    //   { name: "text", description: "text" },
    //   { name: "TextIndex" }
    // );
    // const indexes = await Product.collection.getIndexes()
    // console.log("indexes", indexes)
    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sort)
      .skip(recordsPerPage * (pageNum - 1))
      .limit(recordsPerPage)
      .select(select);

    res.json({
      products,
      pageNum,
      totalPages: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const getBestsellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } },
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      { $replaceWith: "$doc_with_max_sales" },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
      { $limit: 3 },
    ]);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// product controllers for admin
const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .sort({ updatedAt: -1 })
      .select("name price category");

    res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    // console.log(req.params.id)
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "Deleted the product successfully",
      productId: product._id,
      productName: product.name,
    });
  } catch (err) {
    next(err);
  }
};

const adminCreateProduct = async (req, res, next) => {
  try {
    // const {name, description, count, price, category, attrs} = req.body;
    // const product = new Product({name, description, count, price, category, attrs});
    console.log(req.body);
    const product = new Product(req.body);
    await product.save();

    res.json({ product });
  } catch (err) {
    next(err);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const { name, description, count, price, category, attrs } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attrs.length > 0) {
      product.attrs = [];
      attrs.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }

    await product.save();
    res.json({ message: "product updated", product });
  } catch (err) {
    next(err);
  }
};

const adminUpload = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      let product = await Product.findById(req.query.productId);
      product.images.push({ path: req.body.url });
      await product.save();
    } catch (err) {
      next(err);
    }
    return;
  }
  try {
    if (!req.files || !!req.files.images == false) {
      res.status(400).json({ message: "No files were uploaded" });
    }

    let validateResult = imageValidate(req.files.images);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    const { v4: uuidv4 } = require("uuid");
    const folderPath = path.join(
      __dirname,
      "..",
      "..",
      "client",
      "public",
      "products"
    );
    // console.log(folderPath)
    // console.log(__dirname)
    const productId = req.query.productId;
    console.log(productId);

    const product = await Product.findById(productId);

    let imageArr = [];
    if (Array.isArray(req.files.images)) {
      imageArr = req.files.images;
    } else {
      imageArr.push(req.files.images);
    }

    for (const image of imageArr) {
      // console.log(image)
      let fileName = uuidv4() + path.extname(image.name);

      var uploadPath = folderPath + "/" + fileName;
      console.log(uploadPath);

      product.images.push({ path: "/products/" + fileName });

      await new Promise((resolve, reject) => {
        image.mv(uploadPath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    await product.save();

    res.json({ message: "files uploaded" });
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath);
  const productId = req.params.productId;

  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate(
        { _id: productId },
        { $pull: { images: { path: imagePath } } }
      );
      return res.json({ message: "Deleted Successfully" });
    } catch (err) {
      next(err);
    }
    return;
  }

  try {
    // console.log(imagePath)
    const folderPath = path.resolve(__dirname, "../../client/public");
    // console.log(folderPath)

    const filePath = folderPath + "/" + imagePath;

    // fs.unlink(filePath, function (err) {
    //   if(err) res.status(500).send(err);
    // })

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log("Deleted file:", filePath);
    } else {
      console.warn("File not found:", filePath);
    }

    await Product.findOneAndUpdate(
      { _id: productId },
      { $pull: { images: { path: imagePath } } }
    );

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
};
