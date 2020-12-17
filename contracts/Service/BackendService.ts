import { CGP } from 'App/Services/Backend/Models';

export interface BackendServiceContract {
  setToken(token: string): void;

  // CGP
  loginCGP(email: string, password: string): Promise<string>;
  resetCGPPassword(email: string): Promise<void>;
  resetCGPPasswordConfirm(uid: string, token: string, password: string): Promise<void>;

  changeCGPPassword(oldPassword: string, newPassword: string): Promise<void>;
  changeCGPSignature(signature: string): Promise<CGP>;
  getCGPDetails(): Promise<CGP>;
}
