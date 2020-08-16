import { Context } from '../../../../../types';

class CGPAgencyController {
  public async createLogo({ request, response, backendApi }: Context) {
    const file = request.input('file') as string;

    const createdFile = await backendApi.createAgencyLogo(file);

    response.status(200).send(createdFile);
  }
}

export = CGPAgencyController;
