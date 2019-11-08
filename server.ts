import * as bodyParser from "body-parser";
import * as express from "express";
import { Application } from "express";
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
// import { unCoughtErrorHandler } from "./src/handlers/errorHandler";
import { initRoutes } from "./src/routes";

const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
});

const app: Application = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter); //  apply to all requests
// app.use(unCoughtErrorHandler);

initRoutes(app);

app.listen(1337, "localhost", (err: any) => {
  if (err) {
    return err;
  }
  console.info(`Server running on : http://localhost:${1337}`);
});
