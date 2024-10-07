// asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		return fn(req, res, next).catch((err) => next(err));
	};
};

export default asyncHandler;
