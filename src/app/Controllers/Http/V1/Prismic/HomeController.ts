import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class HomeController {
  public async index({ response }: Context): Promise<void> {
    const home = await PrismicApi.getHome();

    response.status(200).send(home);
  }
}

export = HomeController;
