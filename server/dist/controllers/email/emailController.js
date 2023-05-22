"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (req, res) => {
    const { body } = req;
    const transporter = nodemailer_1.default.createTransport({
        host: 'mail.alka.cloud',
        port: 465,
        secure: true,
        auth: {
            user: 'admin@alka.cloud',
            pass: 'Alka@4510$'
        }
    });
    const mailOptions = {
        from: `"${body.nombres} 👻" <${body.email}>`,
        to: 'u22222790@utp.edu.pe',
        subject: `${body.nombres}, registró un reclamo en TEKNOMARKET S.A.C`,
        html: `
    <strong>Nombres:</strong> ${body.nombres} <br/>
    <strong>Apellidos:</strong> ${body.apellidos} <br/>
    <strong>Tipo de documento:</strong> ${body.tipo_doc} <br/>
    <strong>Número de documento:</strong> ${body.num_doc} <br/>
    <strong>Número de documento:</strong> ${body.celular} <br/>
    <strong>E-mail:</strong> ${body.email} <br/>
    <strong>Dirección actual:</strong> ${body.direccion} <br/>
    <strong>Menor de edad:</strong> ${body.menor_edad} <br/>
    <strong>Apoderado:</strong> ${body.apoderado} <br/>
    <strong>Tipo del bien:</strong> ${body.tipo_bien} <br/>
    <strong>Monto reclamado:</strong> ${body.monto} <br/>
    <strong>Descripción:</strong> ${body.descripcion} <br/>
    <strong>Tipo de reclamo:</strong> ${body.tipo_reclamo} <br/>
    <strong>Detalles:</strong> ${body.detalles} <br/>
    <strong>Pedido:</strong> ${body.pedido} <br/>
    <strong>Aceptación de los términos:</strong> ${body.terminos}`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=emailController.js.map