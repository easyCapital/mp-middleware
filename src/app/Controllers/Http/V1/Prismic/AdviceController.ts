import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class AdviceController {
  public async index({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const advices = await PrismicApi.getAdvices(filters, linked, fields, orderBy);

    response.status(200).send(advices);
  }

  public async search({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const advices = await PrismicApi.findAdvices(filters, linked, fields, orderBy);

    response.status(200).send(advices);
  }
}

export = AdviceController;
