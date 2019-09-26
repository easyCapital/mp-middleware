import * as PrismicApi from '../../../Api/Prismic';
import { InvalidArgumentException } from '../../../Exceptions';

class ProductController {
  public async index({ response }) {
    const products = await PrismicApi.getProducts();

    response.status(200).send(products);
  }

  public async get({ params, response }) {
    const { slug } = params;

    const product = await PrismicApi.getProduct(slug);

    response.status(200).send(product);
  }

  public async search({ request, response }) {
    const filters = request.input('filters');

    if (!filters) {
      throw new InvalidArgumentException("Aucun filtre n'a été fourni");
    }

    const products = await PrismicApi.findProducts(filters);

    response.status(200).send(products);
  }
}

export = ProductController;
