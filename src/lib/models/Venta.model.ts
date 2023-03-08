import { Model, DataTypes } from "sequelize";
import sequelize from "../database/connectSQL";

export class Ventas extends Model {
  static DocumentLines: any;
  static Payments: any;

  public ruc_emisor!:string;
  public subtotal_venta!:number;
  public igv!:number;
  public total_venta!:number;
  public icbper_total!:number;
  public icbper_cant!:number;
  public fecha_emision!:string;
  public hora_emision!:string;
  public tdoc!:string;
  public sfactu!:string;
  public nfactu!:string;
  public tdoc_r!:string;
  public sfactu_r!:string;
  public nfactu_r!:string;
  public tp_doc!:string;
  public n_ruc!:string;
  public n_rs!:string;
  public monto_letras!:string;
  public id_transac!:number
}

Ventas.init(
  {
    id_transac: { type: DataTypes.BIGINT, primaryKey: true , autoIncrement: true },
    ruc_emisor: { type: DataTypes.STRING(15),allowNull:false, validate: {notNull: { msg: 'ruc_emisor NOT NULL' }, isNumeric: true, len: { args: [11, 11], msg: 'El ruc_emisor debe tener 11' } } },
    subtotal_venta: { type: DataTypes.DECIMAL(18,2), allowNull:false,validate: { notNull: { msg: 'subtotal_venta NOT NULL' }, }  },
    igv: { type: DataTypes.DECIMAL(18,2), allowNull:false, validate: { notNull: { msg: 'igv NOT NULL' }, }  },
    costo: { type: DataTypes.DECIMAL(18,2) },
    icbper_total: { type: DataTypes.DECIMAL(18,2)  },
    icbper_cant:{ type: DataTypes.INTEGER  } ,
    total_venta: { type: DataTypes.DECIMAL(18,2)  },
    monto_letras: { type: DataTypes.STRING(500) },
    pago_cliente: { type: DataTypes.DECIMAL(18,2)  },
    vuelto: { type: DataTypes.DECIMAL(18,2)  },
    moneda: { type: DataTypes.STRING(25) },
    fecha_emision: { type: DataTypes.STRING(10),allowNull:false, validate: { notNull: { msg: 'fecha_emision NOT NULL' },  len: { args: [10, 10], msg: 'El fecha_emision debe tener 10 caracteres' } } },
    hora_emision: { type: DataTypes.STRING(14),allowNull:false, validate: { notNull: { msg: 'hora_emision NOT NULL' },  len: { args: [8, 8], msg: 'El hora_emision debe tener 8 caracteres' } } },
    fecha_vencimiento: { type: DataTypes.STRING(10) },
    tdoc: { type: DataTypes.STRING(2) },
    sfactu: { type: DataTypes.STRING(4) },
    nfactu: { type: DataTypes.STRING(8) },
    tdoc_r: { type: DataTypes.STRING(2) },
    sfactu_r: { type: DataTypes.STRING(4) },
    nfactu_r: { type: DataTypes.STRING(8) },
    tp_doc : { type: DataTypes.STRING(2) },
    tp_doc_desc	: { type: DataTypes.STRING(8) },
    n_ruc : { type: DataTypes.STRING(15) },
    n_rs : { type: DataTypes.STRING(255) },
    tpo_nc : { type: DataTypes.STRING(2) },
    glosa : { type: DataTypes.STRING(200) },
    anulado : { type: DataTypes.STRING(5) },
    gentxt : { type: DataTypes.BOOLEAN, defaultValue:0 },
  },
  {
    sequelize,
    modelName: "FBN_Ventas",
    tableName: "FBN_Ventas",
    // timestamps: false,
  }
);

export class DocumentLine extends Model {}
  DocumentLine.init({
    id_detalle:{type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, },
    id_transac:{type: DataTypes.BIGINT, },
    id_producto:{type: DataTypes.INTEGER, },
    id_categoria:{type: DataTypes.INTEGER, },
    correlativo:{type: DataTypes.INTEGER, },
    producto:{type: DataTypes.STRING(200), },
    categoria:{type: DataTypes.STRING(200), },
    cantidad:{type: DataTypes.INTEGER, },
    venta: { type: DataTypes.DECIMAL(18,2) },
    total : { type: DataTypes.DECIMAL(18,2) },
  },
    {
        sequelize,
        modelName: 'FBN_documentlines',
        tableName: 'FBN_documentlines',
        timestamps: false,
      }
  )

  export class Payment extends Model {}
  Payment.init({
    id_transac_mp:{type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, },
    id_transac:{type: DataTypes.BIGINT, },
    id_tp:{type: DataTypes.INTEGER, },
    tipo_pago:{type: DataTypes.STRING(200), },
    monto: { type: DataTypes.DECIMAL(18,2) },    
  },
    {
        sequelize,
        modelName: 'FBN_Payments',
        tableName: 'FBN_Payments',
        timestamps: false,
      }
  )
  Ventas.DocumentLines = Ventas.hasMany(DocumentLine, {
    as: 'DocumentLines',
    foreignKey: 'id_transac',
  });
  Ventas.Payments = Ventas.hasMany(Payment, {
    as: 'Payments',
    foreignKey: 'id_transac',
  });
