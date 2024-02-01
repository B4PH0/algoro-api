import { LoginUsersConstrollers } from "../controllers/LoginController";
import { Router } from "express";

const route = Router();
const loginRoute = route.post('/api/usuarios', LoginUsersConstrollers);
export {
    loginRoute
}