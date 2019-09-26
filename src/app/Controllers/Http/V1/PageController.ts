import * as PrismicApi from '../../../Api/Prismic';
import { InvalidArgumentException } from '../../../Exceptions';

class PageController {
  public async index({ response }) {
    const pages = await PrismicApi.getPages();

    response.status(200).send(pages);
  }

  public async get({ params, response }) {
    const { slug } = params;

    const page = await PrismicApi.getPage(slug);

    response.status(200).send(page);
  }

  public async search({ request, response }) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const pages = await PrismicApi.findPages(filters);

    response.status(200).send(pages);
  }
}

export = PageController;
