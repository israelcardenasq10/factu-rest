import VentasLib from '../lib/Ventas.lib';

class Ventas {
  
  static async getList(ruc: string): Promise<object> {
    return await VentasLib.GetRuc(ruc);
  }

  static async insertData(data:any): Promise<object>{
    return await VentasLib.Insert(data);
  }
    
  static async getListTxt(ruc: string): Promise<object> {
    return await VentasLib.GetRucTxt(ruc);
  }
}

export default Ventas;
