export default class User {
  constructor(
    public id: number,
    public email: string,
    public token?: string,
    public firstName?: string,
    public lastName?: string,
  ) {}
}
