import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class ProductController {
  public async index({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const products = await PrismicApi.getProducts(filters, linked, fields, orderBy);

    response.status(200).send(products);
  }

  public async get({ params, response }: Context): Promise<void> {
    const { id } = params;

    const product = await PrismicApi.getProduct(id);

    response.status(200).send(product);
  }

  public async search({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const products = await PrismicApi.findProducts(filters, linked, fields, orderBy);

    response.status(200).send(products);
  }

  public async find({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');

    const product = await PrismicApi.findProduct(filters, linked, fields);

    response.status(200).send(product);
  }
}

export = ProductController;
