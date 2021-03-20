"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const feedslisting_1 = require("../controllers/feedslisting");
let router = express.Router();
router.get('/getfeeds', feedslisting_1.getFeeds);
exports.default = router;
//# sourceMappingURL=getfeedsroutes.js.map