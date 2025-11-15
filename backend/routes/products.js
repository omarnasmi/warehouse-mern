const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    UpdateProduct

} = require('../controllers/productController');

router.get('/', getAllProducts);

router.get('create', async (req, res) => {
    res.json({ message: 'Create Product Page' })
})

router.post('/create', createProduct)

router.get('/:id', getProductById)

router.put('/:id', UpdateProduct)
router.delete('/:id', deleteProduct)

router.patch('/:id', (req, res) => {
    res.json({ message: `Partially update product with ID: ${req.params.id}` })
})



module.exports = router;