import Koa from "koa";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import KoaRouter from "koa-router";
import cors from "koa2-cors";
import { RateLimit } from "koa2-ratelimit";
import koaSwagger from "koa2-swagger-ui";
import swaggerDoc from "../swagger.json";
import { errorHandler } from "./common/handlers/errorHandler";
import { notFoundHandler } from "./common/handlers/notFoundHandler";
import { RegisterRoutes } from "./routes";

const PORT = 5000;
const app = new Koa();

// middleware
app.use(RateLimit.middleware({
  interval: 15 * 60 * 1000, // 15 minutes
  max: 100,
}));

app.use(bodyParser({
  detectJSON: (ctx) => {
    return /\.json$/i.test(ctx.path);
  },
}));
app.use(helmet());
app.use(cors());

// Services routes
const router = new KoaRouter();
router.get("/api-docs", koaSwagger({
  routePrefix: false,
  swaggerOptions: {
    showRequestHeaders: true,
    spec: swaggerDoc,
    jsonEditor: true,
  },
}));
RegisterRoutes(router);

app
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(notFoundHandler);

app.listen(PORT, "localhost", () => {
  console.info(`REST API Server running on : http://localhost:${PORT}`);
});
