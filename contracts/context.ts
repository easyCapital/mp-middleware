import { Client, User } from 'App/Models';
import { BackendServiceContract } from './Service/BackendService';

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    backendService: BackendServiceContract;
    client?: Client;
    auth?: User;
  }
}
