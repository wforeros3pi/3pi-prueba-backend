/** YAML library */
import YAML from 'yamljs';
/** Swagger UI for express */
import swaggerUi from 'swagger-ui-express';

const SCHEMA = process.env.OPENAPI_FILE_PATH ?? './scheme.yaml';

/** Load YAML files */
const swaggerDocument = YAML.load(SCHEMA);

export { swaggerUi, swaggerDocument };
