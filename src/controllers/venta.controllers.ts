import { Handler } from 'express';
import sequelize from '../lib/database/connectSQL';
import Ventas from '../services/ventas.service';

export const insertVenta: Handler = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const data = req.body as any ;
    // console.log('data', data)
    const resp = await Ventas.insertData(data)
    await t.commit();
    res.status(200).send(resp);
  } catch (err: any) {
    const ad = new String(err)
    // console.log('ABCAD', ad)
    await t.rollback();
    next({message:ad});
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
