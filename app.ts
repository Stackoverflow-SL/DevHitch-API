import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as xss from "xss-clean";
import * as rateLimit from "express-rate-limit";
import * as mongoSanitize from "express-mongo-sanitize";
import * as hpp from "hpp";
import * as errorHandler from "./src/helpers/error.handler";
import apiV1 from "./src/api";
import config from "./src/config/config";
import { MongoHelper } from "./src/config/mongodb.config";

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 1000, // No.of Requests
});

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
    this.connectToDB();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(helmet());
    this.express.use(xss());
    this.express.use(mongoSanitize());
    this.express.use(hpp());
    this.express.use(limiter);
  }

  private setRoutes(): void {
    this.express.use("/api/v1", apiV1);
  }

  private async connectToDB(): Promise<void> {
    const MONGO_DB_URI = config.MONGO_DB_URI;
    try {
      await MongoHelper.connect(`${MONGO_DB_URI}`);
      console.info(`Connected to MongoDB!`);
    } catch (err) {
      console.error(`Unable to connect to MongoDB!`, err);
    }
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
    this.express.use(errorHandler.badRequest);
  }
}

export default new App().express;
