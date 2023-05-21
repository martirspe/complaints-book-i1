"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userTypeController_1 = require("../controllers/userTypeController");
const router = (0, express_1.Router)();
router.get('/', userTypeController_1.getUsersTypes);
exports.default = router;
//# sourceMappingURL=userTypeRoute%20copy.js.map