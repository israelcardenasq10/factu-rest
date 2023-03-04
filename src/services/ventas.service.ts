import VentasLib from '../lib/Ventas.lib';

class Ventas {
  // private VentasLib = new VentasLib();

  static async getList(ruc: string): Promise<object> {
    return await VentasLib.GetRuc(ruc);
  }

  static async insertData(data:any): Promise<object>{
    return await VentasLib.Insert(data);
  }
    

}

export default Ventas;
