import { Router } from "express";
import { TransferenciaController } from "../controllers/transferencia.controller.js";

const router = Router();

router.get("/:id", TransferenciaController.getTransferenciaById);
router.post("/", TransferenciaController.createTransfer);

export default router;
