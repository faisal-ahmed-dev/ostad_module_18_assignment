const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload.js');

const UserController=require('../controllers/UserController.js');
const BrandController=require('../controllers/BrandController.js');
const ProductController=require('../controllers/ProductController.js');




router.get('/user-all',UserController.indexUser);
router.post('/user-create',upload,UserController.createUser);
router.get('/user-view/:id',UserController.viewUser);
router.post('/user-update/:id',UserController.updateUser);
router.delete('/delete-user/:id',UserController.deleteUser);
router.get('/check-user/:id',UserController.activeInActiveUser);

router.get('/all-brands',BrandController.readBrand);
router.post('/create-brand',BrandController.createBrand);
router.get('/check-brand/:id',BrandController.activeInActiveBrand);
router.delete('/delete-brand/:id',BrandController.deleteBrand);
router.post('/update-brand/:id',BrandController.updateBrand);
router.get('/single-brand/:id',BrandController.singleBrand);

router.post('/create-product',ProductController.createProduct);
router.get('/all-products',ProductController.readProduct);
router.delete('/delete-product/:id',ProductController.deleteProduct);
router.get('/single-product/:id',ProductController.singleProduct);
router.get('/check-product/:id',ProductController.checkProduct);
router.post('/update-product/:id',ProductController.updateProduct);

router.get('/products',ProductController.readProductAsFrontEnd);
module.exports = router;