import { DataTypes } from "sequelize";
import db from "../db/connection";
import User from "./userModel";

const TipoUsuario = db.define('tipo_usuarios', {
  id_tipo_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false });

TipoUsuario.hasMany(User, { as: 'usuarios', foreignKey: 'id_tipo_usuario' });

export default TipoUsuario;
