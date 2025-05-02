const Category = require("../models/CategoryModel");

const getCategories = async(req, res, next) => {
  try {
    const categories = await Category.find().sort({name: 1})
    
    res.json(categories)

    // res.send("fetching categories")
  } catch (err) {
    next(err)
  }
}

const newCategory = async (req, res, next) => {
  try {
    // res.send(!!req.body);
    const { category } = req.body;
    if(!category) {
      res.status(400).json({ error: "Category input is required"});
    }
    const categoryExists = await Category.findOne({name: category})
    if (categoryExists) {
      res.status(400).json({ error: "Category already exists"})
    } else {
      const categoryCreated = await Category.create({
        name: category
      })
      res.status(201).send({ message: "Category created successfully", category: categoryCreated});
    }
  } catch (error) {
    next(error)
  }
  
}


const deleteCategory = async (req, res, next) => {
  try {
    if(req.params.category) {
      const categoryExists = await Category.findOneAndDelete({
        name: decodeURIComponent(req.params.category)
      }).orFail()
      // if (!categoryExists) {
      //   return res.status(404).json({ message: "Category not found"})
      // }
      res.json({ message: "Category deleted successfully"})
    }
  } catch (error) {
    next(error)
  }
}

const saveAttr = async (req, res, next) => {
  const {key, value, categoryChoosen} = req.body;
  if(!key || !value || !categoryChoosen) {
    return res.status(400).send("All inputs are required");
  }

  try {
    const category = categoryChoosen.split("/")[0];
    console.log(category)
    const categoryExists = await Category.findOne({name: category}).orFail();

    if(categoryExists.attrs.length > 0) {
      var keyNotExist = true

      categoryExists.attrs.map((item, i) => {

        if (item.key === key) {
          keyNotExist = false;
          
          var copyAttrValues = item.value
          copyAttrValues.push(value)
          // console.log(copyAttrValues)
          var newAttrValues = new Set(copyAttrValues)
          console.log(newAttrValues)
          item.value = [...newAttrValues]
        }
      })

      if (keyNotExist) {
        categoryExists.attrs.push({key, value: [value]})
      }
      
    } else {
      categoryExists.attrs.push({key, value: [value]})
    }

    await categoryExists.save()
    let cat = await Category.find({}).sort({name: "asc"});
    console.log(cat.attrs)
    return res.status(201).json({ message: "Attributes updated", updatedCategory: cat})

  } catch (err) {
    next(err)
  }
}

module.exports = {getCategories, newCategory, deleteCategory, saveAttr}; 
