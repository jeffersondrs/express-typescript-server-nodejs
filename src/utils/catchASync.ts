import { Request, Response, NextFunction } from 'express';

const errorHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return fn(req, res, next).catch(next);
  };
};

export default errorHandler;
