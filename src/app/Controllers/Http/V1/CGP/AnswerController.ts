import { Filters, Answer } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPAnswerController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters;

    const answers = await backendApi.getCGPCustomerAnswers(customer, filters);

    response.status(200).send(answers);
  }

  public async create({ params, request, response, backendApi }: Context) {
    const { customer, study, contract } = params;
    const answers = request.post() as Answer[];

    await backendApi.createCGPCustomerAnswers(customer, answers, study, contract);

    response.status(201).send();
  }

  public async deactivate({ params, request, response, backendApi }: Context) {
    const { customer, study, contract } = params;
    const answers = request.post() as Answer[];

    await backendApi.deactivateCGPCustomerAnswers(customer, answers, study, contract);

    response.status(200).send();
  }

  public async searchStudy({ params, request, response, backendApi }: Context) {
    const { study } = params;
    const filters = request.input('filters') as Filters;

    const answers = await backendApi.getCGPStudyAnswers(study, filters);

    response.status(200).send(answers);
  }

  public async searchCGP({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;

    const answers = await backendApi.getCGPAnswers(filters);

    response.status(200).send(answers);
  }

  public async createCGP({ request, response, backendApi }: Context) {
    const answers = request.post() as Answer[];

    await backendApi.createCGPAnswers(answers);

    response.status(201).send();
  }

  public async searchAgency({ request, response, backendApi }: Context) {
    const filters = request.input('filters') as Filters;

    const answers = await backendApi.getAgencyAnswers(filters);

    response.status(200).send(answers);
  }

  public async createAgency({ request, response, backendApi }: Context) {
    const answers = request.post() as Answer[];

    await backendApi.createAgencyAnswers(answers);

    response.status(201).send();
  }

  public async deactivateAgency({ request, response, backendApi }: Context) {
    const answers = request.post() as Answer[];

    await backendApi.deactivateAgencyAnswers(answers);

    response.status(200).send();
  }
}

export = CGPAnswerController;
