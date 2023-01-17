import { Router } from 'express';

const router = Router();

router.get('/example', (req, res, next) => {
  res.status(204);
});

export { router };
