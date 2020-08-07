import { Context } from '../../../../types';

class BaseController {
  public async init({ response }: Context) {
    response.status(200).send();
  }
}

export = BaseController;
