"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const claimController_1 = require("../controllers/claimController");
const router = (0, express_1.Router)();
router.get('/', claimController_1.getClaims);
router.get('/:id', claimController_1.getClaim);
router.post('/', claimController_1.postClaim);
router.put('/:id', claimController_1.putClaim);
router.delete('/:id', claimController_1.deleteClaim);
exports.default = router;
//# sourceMappingURL=claimRoute.js.map