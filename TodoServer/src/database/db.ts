import * as promise from "bluebird";
import pgPromise, { IInitOptions, IDatabase, IMain } from "pg-promise";
import { AuthRepository, IExtensions, TodoRepository } from "../repositories";
import "dotenv/config";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config";

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {
  promiseLib: promise,
  extend(obj: ExtendedProtocol, dc: any) {
    obj.todo = new TodoRepository(obj, pgp);
    obj.auth = new AuthRepository(obj, pgp);
  },
};

const pgp: IMain = pgPromise(initOptions);

const db: ExtendedProtocol = pgp({
  host: `${DB_HOST}`,
  port: parseInt(`${DB_PORT}`),
  database: `${DB_NAME}`,
  user: `${DB_USER}`,
  password: `${DB_PASSWORD}`,
  ssl: true, // ssl should be true in production to avoid security issues
});

export { db, pgp };