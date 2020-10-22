import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class TutorialController {
  public async index({ request, response }: Context) {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const tutorials = await PrismicApi.getTutorials(filters, linked, fields, orderBy);
    response.status(200).send(tutorials);
  }
}

export = TutorialController;
