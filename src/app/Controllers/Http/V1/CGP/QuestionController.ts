import { Filters } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPQuestionController {
  public async index({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;

    const questions = await backendApi.getCGPQuestions(filters);

    response.status(200).send(questions);
  }

  public async updated({ response, backendApi }: Context): Promise<void> {
    const updated = await backendApi.getCGPQuestionsLastUpdated();

    response.status(200).send(updated);
  }

  public async form({ request, response, backendApi }: Context): Promise<void> {
    const key = request.input('key') as string;

    const blocks = await backendApi.getCGPForm(key);

    response.status(200).send(blocks);
  }

  public async questionnaire({ request, response, backendApi }: Context): Promise<void> {
    const key = request.input('key') as string;

    const data = await backendApi.getCGPQuestionnaire(key);

    response.status(200).send(data);
  }
}

export = CGPQuestionController;
