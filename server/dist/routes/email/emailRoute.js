"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../../controllers/email/emailController");
const router = (0, express_1.Router)();
router.post('/', emailController_1.sendMail);
exports.default = router;
//# sourceMappingURL=emailRoute.js.map