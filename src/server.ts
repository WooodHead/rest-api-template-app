import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Express, Request, Response } from "express";
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import { ErrorType } from "./common/errorType";
import { ApiError, errorHandler } from "./common/handlers/errorHandler";
import { RegisterRoutes } from "./routes";

const PORT = 5000;

const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
});
const app: Express = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(limiter);

// Services routes
RegisterRoutes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .send(new ApiError("Route not found", 404, ErrorType.RouteNotFoundException));
});

app.use(errorHandler);

app.listen(PORT, "localhost", (err: any) => {
  if (err) {
    return err;
  }
  console.info(`REST API Server running on : http://localhost:${PORT}`);
});
