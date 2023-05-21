"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceTypeController_1 = require("../controllers/serviceTypeController");
const router = (0, express_1.Router)();
router.get('/', serviceTypeController_1.getServiceTypes);
exports.default = router;
//# sourceMappingURL=serviceTypeRoute.js.map