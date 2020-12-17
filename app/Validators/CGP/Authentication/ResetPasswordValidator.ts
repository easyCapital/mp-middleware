import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    uid: schema.string(),
    token: schema.string(),
    password: schema.string({}, [rules.minLength(8)]),
    passwordConfirm: schema.string({}, [rules.confirmed('password')]),
  });

  public messages = {};
}
