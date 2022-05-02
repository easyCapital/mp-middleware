import { Filters } from '@robinfinance/js-api';
import { Context } from '../../../../types';

class QuestionController {
  public async index({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters;

    const questions = await backendApi.getPublicQuestions(filters);

    response.status(200).send(questions);
  }
  public async questionnaire({ request, response, backendApi }: Context): Promise<void> {
    const key = request.input('key') as string;

    const data = await backendApi.getPublicQuestionnaire(key);

    response.status(200).send(data);
  }
}

export = QuestionController;
