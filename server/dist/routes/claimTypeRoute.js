"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const claimTypeController_1 = require("../controllers/claimTypeController");
const router = (0, express_1.Router)();
router.get('/', claimTypeController_1.getClaimTypes);
exports.default = router;
//# sourceMappingURL=claimTypeRoute.js.map