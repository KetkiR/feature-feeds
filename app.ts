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
app.use(function(req,res, next){
  res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Header' , 'authorization');
   next();
   });
app.use(router);

// API Endpoints
app.get("/", (req, res) => {
  res.send("Hi");
});

// export our app
export default app;