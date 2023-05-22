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
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
var cors = require('cors');
// Routes
const userRoute_1 = __importDefault(require("../routes/userRoute"));
const claimRoute_1 = __importDefault(require("../routes/claimRoute"));
const userTypeRoute_1 = __importDefault(require("../routes/userTypeRoute"));
const claimTypeRoute_1 = __importDefault(require("../routes/claimTypeRoute"));
const serviceTypeRoute_1 = __importDefault(require("../routes/serviceTypeRoute"));
const claimDetailsRoute_1 = __importDefault(require("../routes/claimDetailsRoute"));
const emailRoute_1 = __importDefault(require("../routes/email/emailRoute"));
// Data models
require("./claimModel");
require("./detalleReclamoModel");
require("./tipoBienModel");
require("./tipoReclamoModel");
require("./tipoUsuarioModel");
require("./userModel");
var whitelist = ['http://localhost:4200', 'https://alka.cloud', 'https://api.alka.cloud'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
class Server {
    constructor() {
        this.apiPaths = {
            claims: '/api/claims',
            users: '/api/users',
            userTypes: '/api/user_types',
            claimTypes: '/api/claim_types',
            claimDetails: '/api/claim_details',
            serviceTypes: '/api/service_types',
            sendMail: '/api/sendmail'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                yield connection_1.default.sync();
                // await db.sync({ force: true });
                console.log('Database online.');
            }
            catch (error) {
                throw new Error('Failed to connect to the database.');
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors(corsOptions));
        // Body reading
        this.app.use(express_1.default.json());
        // Public source
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.claims, claimRoute_1.default),
            this.app.use(this.apiPaths.users, userRoute_1.default),
            this.app.use(this.apiPaths.userTypes, userTypeRoute_1.default),
            this.app.use(this.apiPaths.claimTypes, claimTypeRoute_1.default),
            this.app.use(this.apiPaths.claimDetails, claimDetailsRoute_1.default),
            this.app.use(this.apiPaths.serviceTypes, serviceTypeRoute_1.default),
            this.app.use(this.apiPaths.sendMail, emailRoute_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map