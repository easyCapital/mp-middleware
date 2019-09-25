import * as PrismicApi from '../../../Api/Prismic';

class ProductController {
  public async index({ response }) {
    const data = await PrismicApi.getProducts();

    response.status(200).send(data);
  }

  public async get({ params, response }) {
    const { slug } = params;

    const data = await PrismicApi.getProduct(slug);

    response.status(200).send(data);
  }

  public async search({ request, response }) {
    const filters = request.input('filters');

    const data = await PrismicApi.findProducts(filters);

    response.status(200).send(data);
  }
}

export = ProductController;
