import express = require("express");
import * as bodyParser from 'body-parser';
import router from './src/routes/getfeedsroutes';

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use(router);

// API Endpoints
app.get("/", (req, res) => {
  res.send("Hi");
});

// export our app
export default app;