import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserControler";
import { AuthUserControler } from "./controllers/user/AuthUserControler";
import { DetailUserControler } from "./controllers/user/DetailUserControler";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemControllers } from "./controllers/order/RemoveItemControllers";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishedOrderController } from "./controllers/order/FinishedOrderController";

import uploadConfig from './config/multer'

import { isAut } from "./middlewares/isAut";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Rotas Users
router.post('/users', new CreateUserController().handle)

//Rota login
router.post("/session", new AuthUserControler().handle)

router.get("/me", isAut, new DetailUserControler().handle)

//--ROTAS CATEGORY

router.post('/category', isAut, new CreateCategoryController().handle)

router.get('/category', isAut, new ListCategoryController().handle)

//-- ROTAS PRODUCT
router.post('/product', isAut, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAut, new ListByCategoryController().handle)

// -- ROTAS ORDER
router.post('/order', isAut, new CreateOrderController().handle)
router.delete('/order', isAut, new RemoveOrderController().handle)

// -- ROTAS ITENS
router.post('/order/add', isAut, new AddItemController().handle)
router.delete('/order/remove', isAut, new RemoveItemControllers().handle)

// -- Rotas Order positivo
// - Put - Atualizar
router.put('/order/send', isAut, new SendOrderController().handle)

router.get('/orders', isAut, new ListOrderController().handle)

router.get('/order/detail', isAut, new DetailOrderController().handle)

router.put('/order/finished', isAut, new FinishedOrderController().handle)


export { router };

