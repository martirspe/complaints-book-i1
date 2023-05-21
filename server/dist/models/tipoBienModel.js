"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const claimModel_1 = __importDefault(require("./claimModel"));
const TipoBienes = connection_1.default.define("tipo_bienes", {
    id_tipo_bien: {
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
TipoBienes.hasMany(claimModel_1.default, { as: 'reclamos', foreignKey: 'id_tipo_bien' });
exports.default = TipoBienes;
//# sourceMappingURL=tipoBienModel.js.map