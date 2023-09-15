import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CacheControlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Cache-Control', 'max-age=300000');
    res.setHeader('ETag', 'my-etag');
    res.setHeader('Last-Modified', new Date().toUTCString());
    next();
  }
}
