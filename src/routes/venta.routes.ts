import { Application, Router } from 'express';
// import {verifyUserPassw} from '../middlewares/auth';

import * as ventasController from '../controllers/venta.controllers';

const VentasAPI = (app: Application) => {
  const router = Router();
  app.use('/Ventas', router);

  router.get('/find/:ruc', ventasController.listaVenta);
  router.post('/add', ventasController.insertVenta);
};

export default VentasAPI;
