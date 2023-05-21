"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const claimModel_1 = __importDefault(require("./claimModel"));
const User = connection_1.default.define('usuarios', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tipo_documento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    num_documento: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    celular: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    menor_edad: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    id_tipo_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });
User.hasMany(claimModel_1.default, { as: 'reclamos', foreignKey: 'id_usuario' });
exports.default = User;
//# sourceMappingURL=userModel.js.map