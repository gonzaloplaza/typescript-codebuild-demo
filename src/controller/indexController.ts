import { NextFunction, Request, Response } from 'express';

export class IndexController {
  public invoke = (req: Request, res: Response, next: NextFunction) => {
    res.json({ success: true, message: 'Hello World' });
  };
}
