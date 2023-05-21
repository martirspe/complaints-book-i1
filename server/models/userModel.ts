import { DataTypes } from "sequelize";
import db from "../db/connection";
import Claim from "./claimModel";

const User = db.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  tipo_documento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  num_documento: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  celular: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  menor_edad: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  id_tipo_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false });

User.hasMany(Claim, { as: 'reclamos', foreignKey: 'id_usuario' });

export default User;
