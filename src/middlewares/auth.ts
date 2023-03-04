import { Request, Response, NextFunction } from 'express';
import boom, { Boom } from '@hapi/boom';

export const verifyUserPassw  = (  req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization']
    if (!token) {
      next(boom.unauthorized());
    // throw ''
    } else {
      let apisecret = 'Basic ZmwtdG9vbHMtYmFjazpkMDIzOTM2NC0zNTAwLTRlYjgtODAwMi1jZDZkZjEwODk4ZGU='
      if (token == apisecret) {
        next();
      } else {
        next(boom.unauthorized());
      }
    }
  };