"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Claim = connection_1.default.define('reclamo', {
    id_reclamo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tipo_reclamo: sequelize_1.DataTypes.INTEGER,
    id_detalle: sequelize_1.DataTypes.INTEGER,
    id_usuario: sequelize_1.DataTypes.INTEGER,
    id_tipo_bien: sequelize_1.DataTypes.INTEGER,
    estado: sequelize_1.DataTypes.INTEGER,
});
exports.default = Claim;
//# sourceMappingURL=claimModels%20copy.js.map