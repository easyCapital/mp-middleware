import { AgencyDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPAgencyController {
  public async get({ response, backendApi }: Context) {
    const agency = await backendApi.getAgency();

    response.status(200).send(agency);
  }

  public async edit({ request, response, backendApi }: Context) {
    const agencyDTO = request.all() as AgencyDTO;

    const agency = await backendApi.editAgency(agencyDTO);

    response.status(200).send(agency);
  }
}

export = CGPAgencyController;
