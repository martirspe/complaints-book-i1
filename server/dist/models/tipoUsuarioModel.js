"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const userModel_1 = __importDefault(require("./userModel"));
const TipoUsuario = connection_1.default.define('tipo_usuarios', {
    id_tipo_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });
TipoUsuario.hasMany(userModel_1.default, { as: 'usuarios', foreignKey: 'id_tipo_usuario' });
exports.default = TipoUsuario;
//# sourceMappingURL=tipoUsuarioModel.js.map