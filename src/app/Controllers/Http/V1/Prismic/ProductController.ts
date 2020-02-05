import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class ProductController {
  public async index({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const products = await PrismicApi.getProducts(filters, orderBy);

    response.status(200).send(products);
  }

  public async get({ params, response }: Context) {
    const { id } = params;

    const product = await PrismicApi.getProduct(id);

    response.status(200).send(product);
  }

  public async search({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const products = await PrismicApi.findProducts(filters, orderBy);

    response.status(200).send(products);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    const product = await PrismicApi.findProduct(filters);

    response.status(200).send(product);
  }
}

export = ProductController;
