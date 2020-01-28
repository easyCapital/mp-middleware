import * as PrismicApi from '../../../../Api/Prismic';
import { InvalidArgumentException } from '../../../../Exceptions';
import { Context } from '../../../../../types';

class PageController {
  public async index({ response }: Context) {
    const pages = await PrismicApi.getPages();

    response.status(200).send(pages);
  }

  public async get({ params, response }) {
    const { id } = params;

    const page = await PrismicApi.getPage(id);

    response.status(200).send(page);
  }

  public async search({ request, response }: Context) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const pages = await PrismicApi.findPages(filters);

    response.status(200).send(pages);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const page = await PrismicApi.findPage(filters);

    response.status(200).send(page);
  }
}

export = PageController;
