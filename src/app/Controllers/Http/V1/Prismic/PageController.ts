import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class PageController {
  public async index({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const pages = await PrismicApi.getPages(filters, orderBy);

    response.status(200).send(pages);
  }

  public async get({ params, response }) {
    const { id } = params;

    const page = await PrismicApi.getPage(id);

    response.status(200).send(page);
  }

  public async search({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const pages = await PrismicApi.findPages(filters, orderBy);

    response.status(200).send(pages);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    const page = await PrismicApi.findPage(filters);

    response.status(200).send(page);
  }
}

export = PageController;
