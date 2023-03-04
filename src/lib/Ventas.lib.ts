import { Ventas } from './models/Venta.model';

class VentasLib {

  static async Insert(data: any) {
    return await Ventas.create({
      id_transac:data.id_transac,
      ruc_emisor: data.ruc_emisor,
      subtotal_venta: data.subtotal_venta ,
      igv: data.igv ,
      costo: data.costo,
      icbper_total: data.icbper_total,
      icbper_cant: data.icbper_cant,
      total_venta: data.total_venta,
      pago_cliente: data.pago_cliente,
      vuelto: data.vuelto,
      moneda: data.moneda,
      fecha_emision: data.fecha_emision ,
      hora_emision:  data.hora_emision,
      fecha_vencimiento: data.fecha_vencimiento,
      tdoc: data.tdoc ,
      sfactu: data.sfactu,
      nfactu: data.nfactu,
      tdoc_r: data.tdoc_r,
      sfactu_r: data.sfactu_r,
      nfactu_r: data.nfactu_r,
      tp_doc : data.tp_doc,
      tp_doc_desc	: data.tp_doc_desc,
      n_ruc : data.n_ruc,
      n_rs :  data.n_rs,
      tpo_nc : data.tpo_nc,
      glosa :  data.glosa,
      anulado : data.anulado,
      DocumentLines : data.DocumentLines,
      Payments : data.Payments,
      }, {
          include: [{
              association: Ventas.DocumentLines,
          }, {
              association: Ventas.Payments,
          }],
      })
     
  }

  static async GetRuc(ruc: string): Promise<Ventas[]> {
    return await Ventas.findAll ({
      include: [
        {
          association: Ventas.DocumentLines,
        },{
          association: Ventas.Payments,
        }
      ],
      where: {
        ruc_emisor: ruc
      },
      order: [['fecha_emision', 'ASC'],['hora_emision','ASC'],[Ventas.DocumentLines,'correlativo','ASC']],
    })
  }


}

export default VentasLib;
