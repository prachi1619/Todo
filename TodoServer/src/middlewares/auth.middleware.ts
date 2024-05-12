import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { DataStoredInToken, RequestWithUser } from '../contracts';
import { db } from '../database/db';
import { HttpException } from '../utils';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {

  try {
    const Authorization =  (req.headers && req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey  = SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey as string) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await db.oneOrNone('SELECT * FROM users_account WHERE id = $1', [userId]);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};