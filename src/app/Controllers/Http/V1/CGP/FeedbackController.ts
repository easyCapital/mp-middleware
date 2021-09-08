import { FeedbackDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import * as SlackAPI from '../../../../Api/Slack';

class CGPFeedbackController {
  public async send({ request, response, origin }: Context): Promise<void> {
    const { type, title, description, email, agency, files, data } = request.post() as FeedbackDTO;

    try {
      await Promise.all([SlackAPI.sendFeedbackMessage(origin, type, description, email, agency, title, files, data)]);
    } catch {
      return response.status(400).send();
    }

    response.status(200).send();
  }

  public async missingProductOrSupplier({ request, response, origin }: Context): Promise<void> {
    const data = request.post() as {
      email: string;
      supplier: string;
      agency: string | undefined;
      product: string | undefined;
    };

    await SlackAPI.sendOtherProductOrSupplierName(origin, data.email, data.supplier, data.product, data.agency);

    response.status(200).send();
  }
}

export = CGPFeedbackController;
