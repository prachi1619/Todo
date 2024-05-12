export * from "./todo.repository";
export * from "./auth.respository";
import { TodoRepository } from "./todo.repository";
import { AuthRepository } from "./auth.respository";

export interface IExtensions {
  todo: TodoRepository;
  auth: AuthRepository;
}