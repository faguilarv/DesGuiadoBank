import { pool } from "../database/connection.js";

const findOnById = async (id) => {
  const query = {
    text: `
            SELECT * FROM CUENTAS WHERE ID = $1
        `,
    values: [id],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};
const updateSaldo = async (id, saldo) => {
  const query = {
    text: `
      UPDATE CUENTAS
      SET SALDO = SALDO + $1
      WHERE ID = $2
      RETURNING *
      `,
    values: [saldo, id],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

export const CuentaModel = {
  findOnById,
  updateSaldo,
};
