import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPProductController {
  public async index({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;

    const products = await backendApi.getProducts(filters);

    response.status(200).send(products);
  }

  public async get({ params, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    const product = await backendApi.getProduct(id);

    response.status(200).send(product);
  }

  public async getProductCategories({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;

    const categories = await backendApi.getProductCategories(filters);

    response.status(200).send(categories);
  }

  public async getProductCategoriesFactSheet({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;

    const factSheets = await backendApi.getCGPProductCategoriesFactSheet(filters);

    response.status(200).send(factSheets);
  }

  public async updateProductCategoryFactSheet({ params, request, response, backendApi }: Context): Promise<void> {
    const { category } = params;
    const { field } = request.post() as { field: { name: string; value: string } };

    const factSheet = await backendApi.updateCGPProductCategoryFactSheet(category, field);

    response.status(200).send(factSheet);
  }
}

export = CGPProductController;
