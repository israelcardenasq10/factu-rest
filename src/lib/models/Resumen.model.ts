import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connectSQL";

export class Resumen extends Model {
  static DocumentLines: any;
  
  public id_resumen!:number;
  public fec_resumen!:string;
  public ntickect!:string;
  public numreg!:number;
  public NOM_ARCH!:string;
  public ruc_emisor!:string;
 
}

Resumen.init(
  {
    id_resumen:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    ruc_emisor: { type: DataTypes.STRING },
    fec_resumen: { type: DataTypes.DATEONLY, allowNull:false },
    ntickect: { type: DataTypes.STRING },
    numreg: { type: DataTypes.INTEGER },
    NOM_ARCH: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "ResumenDiarioCab",
    tableName: "tb_resumendiario_cab",
    timestamps: false,
  }
);

export class DocumentLine extends Model {}
  DocumentLine.init({
    id_resumen:{type: DataTypes.INTEGER},
    lineNum:{type: DataTypes.INTEGER, },
    fecEmision:{type: DataTypes.DATEONLY, },
    fecResumen:{type: DataTypes.DATEONLY, },
    tdoc:{type: DataTypes.CHAR(2), },
    idDocResumen:{type: DataTypes.STRING(20), },
    tdUser:{type: DataTypes.STRING(20), },
    ndocUser:{type: DataTypes.STRING(20) , },
    totValGrabado:{type: DataTypes.DECIMAL(19,2), },
    totImpCpe:{type: DataTypes.DECIMAL(19,2), },
    tdoc_r:{type: DataTypes.STRING(20), },
    sfactu_r:{type: DataTypes.STRING(20), },
    nfactu_r:{type: DataTypes.STRING(20), },
    estado:{type: DataTypes.STRING(20), },
    igv:{type: DataTypes.STRING(20), },
    icbper:{type: DataTypes.DECIMAL(19,2), },
    icbper_total:{type: DataTypes.DECIMAL(19,2), },					
    	
  },
    {
        sequelize,
        modelName: 'ResumenDiarioLine',
        tableName: 'tb_resumendiariosunat',
        timestamps: false,
      }
  )

  
  Resumen.DocumentLines = Resumen.hasMany(DocumentLine, {
    as: 'DocumentLines',
    foreignKey: 'id_resumen',
  });
