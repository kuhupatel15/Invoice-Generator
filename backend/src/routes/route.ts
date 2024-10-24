const {Router} = require('express');
export const lev_route = Router();
import { isAuthenticated } from "../middleware";
import { Login,SignUp } from "../controllers/authentication";
import { AddProduct } from "../controllers/product";

lev_route.route('/login').post(Login);
lev_route.route('/register').post(SignUp);

lev_route.route('/addproducts').post(isAuthenticated,AddProduct);
