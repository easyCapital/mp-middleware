import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class PageController {
  public async index({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const pages = await PrismicApi.getPages(filters, linked, fields, orderBy);

    response.status(200).send(pages);
  }

  public async get({ params, response }: Context): Promise<void> {
    const { id } = params;

    const page = await PrismicApi.getPage(id);

    response.status(200).send(page);
  }

  public async search({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const pages = await PrismicApi.findPages(filters, linked, fields, orderBy);

    response.status(200).send(pages);
  }

  public async find({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');

    const page = await PrismicApi.findPage(filters, linked, fields);

    response.status(200).send(page);
  }
}

export = PageController;
