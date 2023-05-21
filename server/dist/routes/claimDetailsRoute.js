"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const claimDetailsController_1 = require("../controllers/claimDetailsController");
const router = (0, express_1.Router)();
router.post('/', claimDetailsController_1.postClaimDetails);
exports.default = router;
//# sourceMappingURL=claimDetailsRoute.js.map