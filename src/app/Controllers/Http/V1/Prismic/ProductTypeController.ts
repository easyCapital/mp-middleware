import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class ProductTypeController {
  public async index({ request, response }: Context) {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const types = await PrismicApi.getTypes(filters, linked, fields, orderBy);

    response.status(200).send(types);
  }

  public async get({ params, response }: Context) {
    const { id } = params;

    const type = await PrismicApi.getType(id);

    response.status(200).send(type);
  }

  public async search({ request, response }: Context) {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const types = await PrismicApi.findTypes(filters, linked, fields, orderBy);

    response.status(200).send(types);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');

    const type = await PrismicApi.findType(filters, linked, fields);

    response.status(200).send(type);
  }
}

export = ProductTypeController;
