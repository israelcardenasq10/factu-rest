import { Resumen } from './models/Resumen.model';
import sequelize from "./database/connectSQL";

class ResumenLib {

  static async findAll(ruc:string): Promise<Resumen[]> {
    return await Resumen.findAll ({
      include: [
        {
          association: Resumen.DocumentLines,
        }
      ],
      where:{
        ruc_emisor:ruc        
      }
    })
  }
 
  static async updateResumenTicket(id_resumen:number ,NOM_ARCH:string ){
    await Resumen.update({ NOM_ARCH }, { where: { id_resumen } });
  }

  static async GenerarResumen(fecha:string,ruc:string): Promise<any[]> {
    const [results, metadata] = await sequelize.query(`EXEC usp_ic_insert_resumen ${fecha} , '${ruc}'`);
    return results
  }
}

export default ResumenLib;
