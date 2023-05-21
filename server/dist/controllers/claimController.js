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
exports.deleteClaim = exports.putClaim = exports.postClaim = exports.getClaim = exports.getClaims = void 0;
const claimModel_1 = __importDefault(require("../models/claimModel"));
const getClaims = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const claims = yield claimModel_1.default.findAll();
    res.json(claims);
});
exports.getClaims = getClaims;
const getClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const claim = yield claimModel_1.default.findByPk(id);
    if (claim) {
        res.json(claim);
    }
    else {
        res.status(404).json({
            msg: `No existe un reclamo con el ID: ${id}`
        });
    }
});
exports.getClaim = getClaim;
const postClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const claim = claimModel_1.default.build(body);
        yield claim.save();
        res.json(claim);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador.'
        });
    }
});
exports.postClaim = postClaim;
const putClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const claim = yield claimModel_1.default.findByPk(id);
        if (!claim) {
            return res.status(404).json({
                msg: `No existe un reclamo con el ID: ${id}`
            });
        }
        yield claim.update(body);
        res.json(claim);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador.'
        });
    }
});
exports.putClaim = putClaim;
const deleteClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const claim = yield claimModel_1.default.findByPk(id);
    if (!claim) {
        return res.status(404).json({
            msg: `No existe un reclamo con el ID: ${id}`
        });
    }
    // Actualiza el estado del registro en la db.
    yield claim.update({ estado: 0 });
    // Elimina el registro de la db.
    // await claim.destroy();
    res.json(claim);
});
exports.deleteClaim = deleteClaim;
//# sourceMappingURL=claimController.js.map