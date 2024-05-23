import { CuentaModel } from "../models/cuentas.model.js";

const getCuenta = async (req, res) => {
  try {
    const { id } = req.params;
    const cuenta = await CuentaModel.findOnById(id);
    return res.json(cuenta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false });
  }
};

export const CuentaController = {
  getCuenta,
};
