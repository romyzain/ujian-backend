const express = require('express');
const router = express.Router();
const { productsController } = require('../controller')
const { 
    getProduct,
    editStock,
    addProduct,
    deleteProduct
} = productsController

router.get('/get-product', getProduct)
router.post('/add-product', addProduct)
router.patch('/edit-stock/:id', editStock)
router.delete('/delete-product/:id', deleteProduct)




module.exports = router