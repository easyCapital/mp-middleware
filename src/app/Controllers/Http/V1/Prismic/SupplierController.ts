import * as PrismicApi from '../../../../Api/Prismic';
import { Context } from '../../../../../types';

class SupplierController {
  public async index({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const suppliers = await PrismicApi.getSuppliers(filters, linked, fields, orderBy);

    response.status(200).send(suppliers);
  }

  public async get({ params, response }: Context): Promise<void> {
    const { id } = params;

    const supplier = await PrismicApi.getSupplier(id);

    response.status(200).send(supplier);
  }

  public async search({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');
    const orderBy = request.input('orderBy');

    const suppliers = await PrismicApi.findSuppliers(filters, linked, fields, orderBy);

    response.status(200).send(suppliers);
  }

  public async find({ request, response }: Context): Promise<void> {
    const filters = request.input('filters');
    const linked = request.input('linked');
    const fields = request.input('fields');

    const supplier = await PrismicApi.findSupplier(filters, linked, fields);

    response.status(200).send(supplier);
  }
}

export = SupplierController;
