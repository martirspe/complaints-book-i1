"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const detalleReclamoModel_1 = __importDefault(require("./detalleReclamoModel"));
const Claims = connection_1.default.define('reclamos', {
    id_reclamo: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    }
}, { timestamps: false });
Claims.hasOne(detalleReclamoModel_1.default, { as: 'detalle_reclamos', foreignKey: 'id_reclamo' });
exports.default = Claims;
//# sourceMappingURL=claimModel.js.map