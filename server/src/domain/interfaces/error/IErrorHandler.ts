import { Request, Response, NextFunction } from 'express';

export interface IErrorHandler {
  handleError(err: Error, req: Request, res: Response, next: NextFunction): void;
}
