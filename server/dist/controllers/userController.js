"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.putUsers = exports.postUsers = exports.getUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.findAll();
    res.json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const users = yield userModel_1.default.findByPk(id);
    if (users) {
        res.json(users);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el ID: ${id}`
        });
    }
});
exports.getUser = getUser;
const postUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const users = userModel_1.default.build(body);
        yield users.save();
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador.'
        });
    }
});
exports.postUsers = postUsers;
const putUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const users = yield userModel_1.default.findByPk(id);
        if (!users) {
            return res.status(404).json({
                msg: `No existe un usuario con el ID: ${id}`
            });
        }
        yield users.update(body);
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador.'
        });
    }
});
exports.putUsers = putUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const users = yield userModel_1.default.findByPk(id);
    if (!users) {
        return res.status(404).json({
            msg: `No existe un usuario con el ID: ${id}`
        });
    }
    // Actualiza el estado del registro en la db.
    yield users.update({ estado: 0 });
    // Elimina el registro de la db.
    // await users.destroy();
    res.json(users);
});
exports.deleteUsers = deleteUsers;
//# sourceMappingURL=userController.js.map