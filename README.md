# Backend Template

Template para proyectos backend siguiendo arquitectura limpia, este incluye:

- Modulos comunos con errores HTTP, healthy controllers, respuestas de APIs como clases, interfaz de operaciones
- Librerias mas comunes como luxon, dotenv, morgan, entre otras...
- helpers basicos
- Drivers para implementar bases de datos de Mongo, Redis y consultas a Axios
- Un servidor web usando Express, incluye rutas healthy
- Husky para validaciones antes de hacer commits (incluyendo tests con Jest y Supertest)
- Linters extendiendo el standard (./node_modules/standard/eslintrc.json)
- Nodemon configurado
