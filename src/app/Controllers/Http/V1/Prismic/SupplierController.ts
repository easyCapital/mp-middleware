import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class SupplierController {
  public async index({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const suppliers = await PrismicApi.getSuppliers(filters, orderBy);

    response.status(200).send(suppliers);
  }

  public async get({ params, response }: Context) {
    const { id } = params;

    const supplier = await PrismicApi.getSupplier(id);

    response.status(200).send(supplier);
  }

  public async search({ request, response }: Context) {
    const orderBy = request.input('orderBy');
    const filters = request.input('filters');

    const suppliers = await PrismicApi.findSuppliers(filters, orderBy);

    response.status(200).send(suppliers);
  }

  public async find({ request, response }: Context) {
    const filters = request.input('filters');

    const supplier = await PrismicApi.findSupplier(filters);

    response.status(200).send(supplier);
  }
}

export = SupplierController;
