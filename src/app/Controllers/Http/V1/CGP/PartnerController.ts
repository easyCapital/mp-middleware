import { Filters, OrderBy, Pagination } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPPartnerController {
  public async create({ request, response, backendApi }: Context): Promise<void> {
    const { supplier, products } = request.post() as { supplier: number; products?: number[] };

    const partner = await backendApi.createCGPPartner(supplier, products);

    response.status(200).send(partner);
  }

  public async search({ request, response, backendApi }: Context): Promise<void> {
    const pagination = request.input('pagination') as Pagination;
    const filters = request.input('filters') as Filters;
    const orderBy = request.input('orderBy') as OrderBy;

    const partners = await backendApi.getCGPPartners(pagination, filters, orderBy);

    response.status(200).send(partners);
  }

  public async delete({ params, response, backendApi }: Context): Promise<void> {
    const { partner } = params;

    await backendApi.deleteCGPPartner(partner);

    response.status(204);
  }

  public async update({ params, request, response, backendApi }: Context): Promise<void> {
    const { partner } = params;
    const { products, description } = request.post() as { products: number[]; description?: string };

    const partners = await backendApi.updateCGPPartner(partner, products, description);

    response.status(200).send(partners);
  }

  public async getProductPartnerInformation({ params, response, backendApi }: Context): Promise<void> {
    const { partner, product } = params;

    const data = await backendApi.getCGPProductPartnerInformation(partner, product);

    response.status(200).send(data);
  }

  public async updateProductPartnerInformation({ params, request, response, backendApi }: Context): Promise<void> {
    const { partner, product } = params;
    const { field } = request.post() as { field: { name: string; value: string } };

    const data = await backendApi.updateCGPProductPartnerInformation(partner, product, field);

    response.status(200).send(data);
  }
}

export = CGPPartnerController;
