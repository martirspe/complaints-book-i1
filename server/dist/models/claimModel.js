"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Claims = connection_1.default.define('reclamos', {
    id_reclamo: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_tipo_reclamo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_detalle: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_tipo_bien: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    }
}, { timestamps: false });
exports.default = Claims;
//# sourceMappingURL=claimModel.js.map