import { pool } from "../database/connection.js";
import { CuentaModel } from "./cuentas.model.js";

const findCuentaId = async (id) => {
  const query = {
    text: `
        SELECT * FROM TRANSFERENCIAS
        WHERE cuenta_origen = $1
         LIMIT 10
        
        `,
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows;
};

const createTransferencia = async (cuenta_origen, cuenta_destino, monto) => {
  try {
    await pool.query("BEGIN");

    await CuentaModel.updateSaldo(cuenta_origen, -monto);
    await CuentaModel.updateSaldo(cuenta_destino, +monto);

    const query = {
      text: `
            INSERT INTO TRANSFERENCIAS
            (MONTO, cuenta_origen, cuenta_destino)
            VALUES ($1, $2, $3)
            RETURNING *          
            `,
      values: [monto, cuenta_origen, cuenta_destino],
    };
    const { rows } = await pool.query(query);

    await pool.query("COMMIT");

    return rows[0];
  } catch (error) {
    console.log(error);
    await pool.query("ROLLBACK");
    throw error;
  }
};

export const TransferenciaModel = {
  findCuentaId,
  createTransferencia,
};
