import { Filters, Answer, OrderBy } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPAnswerController {
  public async search({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters | undefined;
    const orderBy = request.input('orderBy') as OrderBy | undefined;
    const latestBy = request.input('latestBy') as string | undefined;

    const answers = await backendApi.getCGPAnswers(filters, orderBy, latestBy);

    response.status(200).send(answers);
  }

  public async createCustomer({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study, contract } = params;
    const answers = request.post() as Answer[];

    await backendApi.createCGPCustomerAnswers(customer, answers, study, contract);

    response.status(201).send();
  }

  public async deactivateCustomer({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study, contract } = params;
    const answers = request.post() as Answer[];

    await backendApi.deactivateCGPCustomerAnswers(customer, answers, study, contract);

    response.status(200).send();
  }

  public async createHousehold({ params, request, response, backendApi }: Context): Promise<void> {
    const { household, study, contract } = params;
    const answers = request.post() as Answer[];

    await backendApi.createHouseholdAnswers(household, answers, study, contract);

    response.status(201).send();
  }

  public async deactivateHousehold({ params, request, response, backendApi }: Context): Promise<void> {
    const { household, study, contract } = params;
    const answers = request.post() as Answer[];

    await backendApi.deactivateHouseholdAnswers(household, answers, study, contract);

    response.status(201).send();
  }

  public async migrateHousehold({ params, request, response, backendApi }: Context): Promise<void> {
    const { household } = params;
    const questions = request.post() as string[];

    await backendApi.migrateHouseholdAnswers(household, questions);

    response.status(201).send();
  }

  public async createCGP({ request, response, backendApi }: Context): Promise<void> {
    const answers = request.post() as Answer[];

    await backendApi.createCGPAnswers(answers);

    response.status(201).send();
  }

  public async deactivateCGP({ request, response, backendApi }: Context): Promise<void> {
    const answers = request.post() as Answer[];

    await backendApi.deactivateCGPAnswers(answers);

    response.status(200).send();
  }

  public async searchAgency({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;

    const answers = await backendApi.getAgencyAnswers(filters);

    response.status(200).send(answers);
  }

  public async createAgency({ request, response, backendApi }: Context): Promise<void> {
    const answers = request.post() as Answer[];

    await backendApi.createAgencyAnswers(answers);

    response.status(201).send();
  }

  public async deactivateAgency({ request, response, backendApi }: Context): Promise<void> {
    const answers = request.post() as Answer[];

    await backendApi.deactivateAgencyAnswers(answers);

    response.status(200).send();
  }
}

export = CGPAnswerController;
