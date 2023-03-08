import { Ventas } from './models/Venta.model';
import fs from 'fs'
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
      monto_letras:data.monto_letras,
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

  static async GetRucTxt(ruc: string): Promise<Ventas[]> {
    return await Ventas.findAll ({
      include: [
        {
          association: Ventas.DocumentLines,
        }
      ],
      where: {
        ruc_emisor: ruc,
        gentxt : 0,
        tdoc : '01'
      },
      order: [['fecha_emision', 'ASC'],['hora_emision','ASC'],[Ventas.DocumentLines,'correlativo','ASC']],
    })
  }

  static async updateToTxt(id_transac: number ){
    await Ventas.update({ gentxt:1 }, { where: { id_transac } });
  }

  static async generartxt(ruc : string,url:string,g_igv:number, r:Ventas ){
    let nom_file= `${ruc}-${r.tdoc}-${r.sfactu}-${r.nfactu}` 
    // GENERAR ARCHIVO .CAB
    let cabecera=`0101|${r.fecha_emision}|${r.hora_emision}|-|0000|${r.tp_doc}|${r.n_ruc}|${r.n_rs}|PEN|${r.igv}|${r.subtotal_venta.toFixed(2)}|${(r.igv + r.subtotal_venta).toFixed(2)}|0.00|${(r.total_venta-(r.subtotal_venta+r.igv)).toFixed(2)}|0.00|${r.total_venta.toFixed(2)}|2.1|2.0|`
    fs.writeFileSync(`${url}${nom_file}.cab`,cabecera)
    // GENERAR ARCHIVO .DET
    let lineaDet=''
    //@ts-ignore
    r.DocumentLines.forEach(ele => {
      let mas_igv= ((100 + g_igv) / 100);
      let subtotal_venta = (ele.total /  mas_igv);
      let igv_det = (ele.total - subtotal_venta);
      let m_precio_ven_uni = (subtotal_venta + igv_det);
      let icbper_line=''
      if(ele.categoria == 'BOLSAS'){
        icbper_line  =`7152|-|${ele.cantidad*0.50}|${ele.cantidad}|ICBPER|OTH|0.50|`
      }else{
        icbper_line =`0.00|-|0.00|0.00|||0.00|`        
      }
      lineaDet += `NIU|${ele.cantidad}|1|-|${ele.producto}|${(subtotal_venta/ele.cantidad).toFixed(2)}|${igv_det.toFixed(2)}|1000|${igv_det.toFixed(2)}|${subtotal_venta.toFixed(2)}|IGV|VAT|10|${g_igv.toFixed(2)}|-|0.00|0.00||||0.00|-|0.00|0.00|||${icbper_line}${(m_precio_ven_uni/ele.cantidad).toFixed(2)}|${subtotal_venta.toFixed(2)}|0.00|\r\n`
    });
    fs.writeFileSync(`${url}${nom_file}.det`,lineaDet)
    // GENERAR ARCHIVO .LEY - sunat = 20509921793-03-B001-00000001.ley
    let lineaLey = `1000|${r.monto_letras}|`
    fs.writeFileSync(`${url}${nom_file}.ley`,lineaLey)
    // GENERAR ARCHIVO .PAG - sunat = 20509921793-03-B001-00000001.pag
    let lineaPag=`Contado|-|-|`
    fs.writeFileSync(`${url}${nom_file}.pag`,lineaPag)
    // GENERAR ARCHIVO .TRI - sunat = 20509921793-03-B001-00000001.tri
    let lineaTrib =`1000|IGV|VAT|${r.subtotal_venta.toFixed(2)}|${r.igv}|`
    fs.writeFileSync(`${url}${nom_file}.tri`,lineaTrib)

  }

}

export default VentasLib;
