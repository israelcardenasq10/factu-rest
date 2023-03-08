import { Documento } from './models/Document.sqlite.model';
import fs from 'fs'
class DocumentoLib {

  static async findAll(): Promise<Documento[]> {
    return await Documento.findAll ()
  }
 
  static async updateFacturaRechazada(NOM_ARCH: string ){
    await Documento.update({ IND_SITU:'02' }, { where: { NOM_ARCH } });
  }

  static async updateResumenRechazada(DES_OBSE:string ,NOM_ARCH:string ){
    await Documento.update({ DES_OBSE ,IND_SITU:'08' }, { where: { NOM_ARCH } });
  }

}

export default DocumentoLib;
