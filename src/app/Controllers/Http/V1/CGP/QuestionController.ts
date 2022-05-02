import { Context } from '../../../../../types';

class CGPQuestionController {
  public async updated({ response, backendApi }: Context): Promise<void> {
    const updated = await backendApi.getCGPQuestionsLastUpdated();

    response.status(200).send(updated);
  }

  public async form({ request, response, backendApi }: Context): Promise<void> {
    const key = request.input('key') as string;

    const blocks = await backendApi.getCGPForm(key);

    response.status(200).send(blocks);
  }
}

export = CGPQuestionController;
