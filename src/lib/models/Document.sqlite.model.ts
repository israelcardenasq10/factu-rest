import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connectSQLite";

export class Documento extends Model {
  public ruc_emisor!:string;
  public NUM_RUC!:string;
  public TIP_DOCU!:string;
  public NUM_DOCU!:string;
}

Documento.init(
  {
    NUM_RUC: { type: DataTypes.STRING },
    TIP_DOCU: { type: DataTypes.STRING },
    NUM_DOCU: { type: DataTypes.STRING },
    FEC_CARG: { type: DataTypes.STRING },
    FEC_GENE: { type: DataTypes.STRING },
    FEC_ENVI: { type: DataTypes.STRING },
    DES_OBSE: { type: DataTypes.STRING },
    NOM_ARCH: { type: DataTypes.STRING },
    IND_SITU: { type: DataTypes.STRING },
    TIP_ARCH: { type: DataTypes.STRING },
    FIRM_DIGITAL: { type: DataTypes.STRING },

  },
  {
    sequelize,
    modelName: "DOCUMENTO",
    tableName: "DOCUMENTO",
    timestamps: false,
  }
);

