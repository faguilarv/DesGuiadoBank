import "dotenv/config";
import express from "express";
import cuentaRouter from "./router/cuenta.route.js";
import transferenciaRouter from "./router/transferencia.route.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/cuentas", cuentaRouter);
app.use("/api/v1/transferencias", transferenciaRouter);

//coneccion al puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Conectado exitosamente al puerto ${PORT}`);
});
