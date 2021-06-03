import { Filters, OrderBy, Pagination } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPPartnerController {
  public async create({ request, response, backendApi }: Context) {
    const { supplier, products } = request.post() as { supplier: number; products?: number[] };

    const partner = await backendApi.createCGPPartner(supplier, products);

    response.status(200).send(partner);
  }

  public async search({ request, response, backendApi }: Context) {
    const pagination = request.input('pagination') as Pagination;
    const filters = request.input('filters') as Filters;
    const orderBy = request.input('orderBy') as OrderBy;

    const partners = await backendApi.getCGPPartners(pagination, filters, orderBy);

    response.status(200).send(partners);
  }

  public async delete({ params, response, backendApi }: Context) {
    const { partner } = params;

    await backendApi.deleteCGPPartner(partner);

    response.status(204);
  }

  public async update({ params, request, response, backendApi }: Context) {
    const { partner } = params;
    const { products } = request.post() as { products: number[] };

    const partners = await backendApi.updateCGPPartner(partner, products);

    response.status(200).send(partners);
  }
}

export = CGPPartnerController;
