import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ChangePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    oldPassword: schema.string(),
    newPassword: schema.string({}, [rules.minLength(8)]),
    newPasswordConfirm: schema.string({}, [rules.confirmed('newPassword')]),
  });

  public messages = {};
}
