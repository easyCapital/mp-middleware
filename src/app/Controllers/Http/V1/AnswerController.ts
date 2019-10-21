import { Context } from '../../../../types';

class AnswerController {
  public async create({ request, response, backendApi }: Context) {
    const answers: any = request.post();

    await backendApi.createAnswers(answers);

    response.status(200).send();
  }
}

export = AnswerController;
