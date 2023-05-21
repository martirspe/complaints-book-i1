import { DataTypes } from "sequelize";
import db from "../db/connection";

const Claims = db.define('reclamos', {
  id_reclamo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  id_tipo_reclamo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_detalle: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_bien: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  }
}, { timestamps: false });

export default Claims;
