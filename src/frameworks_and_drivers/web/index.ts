/** Express server import */
import express, { json } from 'express';
/** Morgan Middleware */
import morgan from '@fnd/external_interfaces/morgan';
/** Cors */
import cors from 'cors';
/** Import openapi */
import { apiSpec, OpenApiValidator } from '@fnd/external_interfaces/open_api';
/** Import logger */
import logger from '@fnd/external_interfaces/logger';
import { errorHandler } from '@fnd/web/middlewares/error/error_handler';
import { routes } from '@fnd/web/routes';
import {
  swaggerUi,
  swaggerDocument
} from '@fnd/external_interfaces/swagger_ui';

/** Init logger */
const Logger = logger(__filename);

const HTTP_PORT = process.env.PORT || 3000;
const OPENAPI_SPEC = process.env.OPENAPI_SPEC || '/spec';
const OPENAPI_DOCS = process.env.OPENAPI_DOCS || '/docs';

export class Server {
  app: express.Application;

  constructor () {
    this.app = express();
    this.config();
  }

  config () {
    // MIDDLEWARES
    /** Morgan to see logs in dev */
    this.app.use(
      morgan().unless({
        path: ['/', '/readiness', '/healthy']
      })
    );
    /** To process json request */
    this.app.use(json());
    /** To give cors permissions */
    this.app.use(cors());
    this.app.options('*', cors);
    /** Swagger UI */
    this.app.use(
      OPENAPI_DOCS,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  routes () {
    this.app.use(routes);
  }

  configOpenAPi () {
    /** Add route to dowloand OAS file */
    this.app.use(OPENAPI_SPEC, express.static(apiSpec || ''));
    /** Install Validator in Express App */
    this.app.use(OpenApiValidator);
  }

  initErrorHandler () {
    /** Error Handler */
    this.app.use(errorHandler);
  }

  start () {
    try {
      this.configOpenAPi();
      this.routes();
      this.initErrorHandler();
      this.app.listen(HTTP_PORT, () => {
        Logger.warn(
                    `🆗 Express Application Running on port ${HTTP_PORT}`
        );
      });
    } catch (error: any) {
      if (error instanceof Error) { Logger.error(`ERROR : ${error.message} STACK : ${error.stack}`); }
    }
  }
}
