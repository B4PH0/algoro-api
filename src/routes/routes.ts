import { LoginUsersController } from "../controllers/LoginController";
import { SignupController } from "../controllers/SignupController";
import { Router } from "express";

const route = Router();
const loginRoute = route.post('/api/users/login', LoginUsersController);
const signupRoute = route.post('/api/users/signup', SignupController);
export {
    loginRoute,
    signupRoute
};