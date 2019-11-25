import { Context } from '../../../../../types';

class CGPAnswerController {
  public async create({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const answers: any = request.post();

    await backendApi.createCGPAnswers(customer, answers);

    response.status(200).send();
  }
}

export = CGPAnswerController;
