import * as PrismicApi from '../../../Api/Prismic';
import { InvalidArgumentException } from '../../../Exceptions';
import { Context } from '../../../../types';

class AdviceController {
  public async index({ response }: Context) {
    const advices = await PrismicApi.getAdvices();

    response.status(200).send(advices);
  }

  public async search({ request, response }: Context) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const advices = await PrismicApi.findAdvices(filters);

    response.status(200).send(advices);
  }
}

export = AdviceController;
