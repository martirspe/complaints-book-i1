"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const claimModel_1 = __importDefault(require("./claimModel"));
const TipoReclamos = connection_1.default.define('tipo_reclamos', {
    id_tipo_reclamo: {
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
TipoReclamos.hasMany(claimModel_1.default, { as: 'reclamos', foreignKey: 'id_tipo_reclamo' });
exports.default = TipoReclamos;
//# sourceMappingURL=tipoReclamoModel.js.map