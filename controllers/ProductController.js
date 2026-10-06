const Product = require("../models/ProductModel");

const {deleteFile} = require("../utils/fileHelper");
const createProduct = async(req,res)=>{
    try{
        const {name,price,category} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Product name is required"
            })
        }

        //if an image was uploaded , build its path
        let image = null;
        if(req.file){
            image = 'uploads/' + req.file.filename;
        }
        //create category in database
        const product = await Product.create({
            name,
            price,
            category,
            image
        });
        res.status(201).json({
            success:true,
            message:"Product created successfully",
           product
        })

    }
    catch(error){
        if(req.file){
            deleteFile(req.file.filename);
        }
        res.status(400).json({
            success:false,
            message:"Product creation failed",
            error:error.message
        })
    }
}

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET SINGLE PRODUCT
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {

    const updateData = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      isActive: req.body.isActive
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct

}