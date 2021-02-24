import { Request, Response, Router as ExpressRouter } from 'express';
import { IndexController } from './controller/indexController';

export const Router = (): ExpressRouter => {
  const router = ExpressRouter();

  router.get('/', new IndexController().invoke);

  router.use(routeNotFoundErrorHandler);

  return router;
};

const routeNotFoundErrorHandler = (req: Request, res: Response): void => {
  res.status(404).send({ error: 404, message: 'Route not found' });
};
