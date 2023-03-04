import { Handler } from 'express';
import sequelize from '../lib/database/connectSQL';
import Ventas from '../services/ventas.service';

export const insertVenta: Handler = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const data = req.body as any ;
    const resp = await Ventas.insertData(data)
    await t.commit();
    res.status(200).send(resp);
  } catch (err: any) {
    await t.rollback();
    next(err);
  }
};

export const listaVenta: Handler = async (req, res, next) => {
  try {
    const ruc = req.params['ruc'] as string;
    const resp = await Ventas.getList(ruc)

    res.status(200).send(resp);
  } catch (err) {
    next(err);
  }
};
