"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const getfeedsroutes_1 = require("./src/routes/getfeedsroutes");
// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json({
    limit: '50mb',
    verify(req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use(getfeedsroutes_1.default);
// API Endpoints
app.get("/", (req, res) => {
    res.send("Hi");
});
// export our app
exports.default = app;
//# sourceMappingURL=app.js.map