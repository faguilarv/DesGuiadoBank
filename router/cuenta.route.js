import { Router } from "express";
import { CuentaController } from "../controllers/cuenta.controller.js";

const router = Router();

router.get("/:id", CuentaController.getCuenta);

export default router;
