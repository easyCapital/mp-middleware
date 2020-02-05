import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class ProductTypeController {
  public async index({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const types = await PrismicApi.getTypes(filters, orderBy);

    response.status(200).send(types);
  }

  public async get({ params, response }: Context) {
    const { id } = params;

    const type = await PrismicApi.getType(id);

    response.status(200).send(type);
  }

  public async search({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const types = await PrismicApi.findTypes(filters, orderBy);

    response.status(200).send(types);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    const type = await PrismicApi.findType(filters);

    response.status(200).send(type);
  }
}

export = ProductTypeController;
