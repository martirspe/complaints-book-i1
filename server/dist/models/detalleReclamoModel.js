"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DetalleReclamos = connection_1.default.define('detalle_reclamos', {
    id_detalle: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    monto_reclamado: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    detalles_reclamo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pedido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    documento_adjunto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    respuesta: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    correo_enviado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    },
    id_reclamo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });
exports.default = DetalleReclamos;
//# sourceMappingURL=detalleReclamoModel.js.map