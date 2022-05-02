import { Context } from '../../../../../types';

class CGPAnalysisController {
  public async create({ params, response, backendApi }: Context): Promise<void> {
    const { household } = params;

    const data = await backendApi.createCGPClientForm(household);

    response.status(200).send(data);
  }

  public async deactivate({ params, response, backendApi }: Context): Promise<void> {
    const { uuid } = params;

    const data = await backendApi.deactivateCGPClientForm(uuid);

    response.status(200).send(data);
  }

  public async getActiveClientForm({ params, response, backendApi }: Context): Promise<void> {
    const { household } = params;

    const data = await backendApi.getCGPActiveClientForm(household);

    response.status(200).send(data);
  }
}

export = CGPAnalysisController;
