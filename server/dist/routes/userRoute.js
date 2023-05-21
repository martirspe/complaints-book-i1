"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', userController_1.getUsers);
router.get('/:id', userController_1.getUser);
router.post('/', userController_1.postUsers);
router.put('/:id', userController_1.putUsers);
router.delete('/:id', userController_1.deleteUsers);
exports.default = router;
//# sourceMappingURL=userRoute.js.map