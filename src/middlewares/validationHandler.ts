import { Request, Response, NextFunction } from 'express';

import boom from '@hapi/boom';
import joi, { ValidationError, ValidationResult } from 'joi';

// Input data validator by path: body (default), query, params.
// e.g,: validationHandler(userRegisterSchema, 'query')

const validate = (data: Object, schema: Object): ValidationError | undefined => {
  const { error }: ValidationResult = joi.object(schema).validate(data, { convert: false });
  
  return error;
};

const validationHandler = (schema: Object, check: keyof Request = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const error: ValidationError | undefined = validate(req[check] || {}, schema);

    error ? next(boom.badRequest(error.message)) : next();
  };
};

export default validationHandler;
