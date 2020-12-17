import { schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ChangeSignatureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    signature: schema.string(),
  });

  public messages = {};
}
