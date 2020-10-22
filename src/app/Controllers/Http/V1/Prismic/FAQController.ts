import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class FAQController {
  public async index({ request, response }: Context) {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const questions = await PrismicApi.getFAQ(filters, linked, fields, orderBy);

    response.status(200).send(questions);
  }
}

export = FAQController;
