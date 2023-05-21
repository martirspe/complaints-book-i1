"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userTypeController_copy_1 = require("../controllers/userTypeController copy");
const router = (0, express_1.Router)();
router.get('/', userTypeController_copy_1.getUsersTypes);
exports.default = router;
//# sourceMappingURL=userTypeRoute.js.map