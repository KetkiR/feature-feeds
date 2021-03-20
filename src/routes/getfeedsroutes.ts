import * as express from "express";
import { getFeeds}  from '../controllers/feedslisting';
let router = express.Router();

router.get('/getfeeds', getFeeds);
export default router;