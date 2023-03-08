import VentasLib from '../lib/Ventas.lib'


export const sendVentas = async (ruc:string , ruta:string , igv:number) => {
    const billInvoices = await VentasLib.GetRucTxt(ruc);
    if (!billInvoices.length) return;
    console.time('genTxt')
    billInvoices.map(async (billInvoice)=>{
       await VentasLib.generartxt(ruc,ruta,igv,billInvoice);        
       await VentasLib.updateToTxt(billInvoice.id_transac)
    })
    console.timeEnd('genTxt')
  };


