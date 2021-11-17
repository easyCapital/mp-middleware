import { Filters, Pagination, OrderBy, CreateHouseholdDTO, HouseholdDTO, MemberDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class HouseholdController {
  public async create({ request, response, backendApi }: Context): Promise<void> {
    const household = request.post() as CreateHouseholdDTO;

    const createdHousehold = await backendApi.createHousehold(household);

    response.status(200).send(createdHousehold);
  }

  public async member({ params, request, response, backendApi }: Context): Promise<void> {
    const { id } = params;
    const member = request.post() as MemberDTO;

    const household = await backendApi.createHouseholdMember(id, member);

    response.status(200).send(household);
  }

  public async import({ request, response, backendApi }: Context): Promise<void> {
    const households = request.post() as CreateHouseholdDTO[];

    const createdHouseholds = await backendApi.createHouseholds(households);

    response.status(200).send(createdHouseholds);
  }

  public async prevalidate({ request, response, backendApi }: Context): Promise<void> {
    const households = request.post() as CreateHouseholdDTO[];

    await backendApi.prevalidateHouseholds(households);

    response.status(204);
  }

  public async edit({ params, request, response, backendApi }: Context): Promise<void> {
    const { id } = params;
    const data = request.post() as HouseholdDTO;

    const household = await backendApi.editHousehold(id, data);

    response.status(200).send(household);
  }

  public async get({ params, response, backendApi }: Context): Promise<void> {
    const { id } = params;

    const household = await backendApi.getHousehold(id);

    response.status(200).send(household);
  }

  public async search({ request, response, backendApi }: Context): Promise<void> {
    const pagination = request.input('pagination') as Pagination;
    const filters = request.input('filters') as Filters;
    const orderBy = request.input('orderBy') as OrderBy;

    const households = await backendApi.searchHouseholds(pagination, filters, orderBy);

    response.status(200).send(households);
  }
}

export = HouseholdController;
