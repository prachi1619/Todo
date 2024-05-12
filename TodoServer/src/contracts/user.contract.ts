import { Request } from 'express';

/* ---------------------------------- User ---------------------------------- */

export class User {
  id?: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
}

/* ----------------------------- RequestWithUser ---------------------------- */

export interface RequestWithUser extends Request {
  user?: User;
}