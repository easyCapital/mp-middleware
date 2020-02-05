import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class AdviceController {
  public async index({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const advices = await PrismicApi.getAdvices(filters, orderBy);

    response.status(200).send(advices);
  }

  public async search({ request, response }: Context) {
    const filters = request.input('filters');
    const orderBy = request.input('orderBy');

    const advices = await PrismicApi.findAdvices(filters, orderBy);

    response.status(200).send(advices);
  }
}

export = AdviceController;
