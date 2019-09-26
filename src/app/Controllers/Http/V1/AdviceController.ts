import * as PrismicApi from '../../../Api/Prismic';
import { InvalidArgumentException } from '../../../Exceptions';

class AdviceController {
  public async index({ response }) {
    const advices = await PrismicApi.getAdvices();

    response.status(200).send(advices);
  }

  public async search({ request, response }) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const advices = await PrismicApi.findAdvices(filters);

    response.status(200).send(advices);
  }
}

export = AdviceController;
