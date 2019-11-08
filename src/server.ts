import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Application, NextFunction, Request, Response } from "express";
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
import { errorHandler } from "./handlers/errorHandler";
import { InitApiRoutes } from "./routes";

const PORT = 5000;

const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
});

const app: Application = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(limiter);

// api routes
InitApiRoutes(app);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({Message: "Route not found"});
});

app.use(errorHandler);

app.listen(PORT, "localhost", (err: any) => {
  if (err) {
    return err;
  }
  console.info(`REST API Server running on : http://localhost:${PORT}`);
});
