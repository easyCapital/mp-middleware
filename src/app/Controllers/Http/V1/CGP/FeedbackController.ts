import { FeedbackDTO } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import * as SlackAPI from '../../../../Api/Slack';
import * as SendgridAPI from '../../../../Api/Sendgrid';

class CGPFeedbackController {
  public async send({ request, response }: Context) {
    const { type, title, description, email, files } = request.post() as FeedbackDTO;

    try {
      await Promise.all([
        SlackAPI.sendFeedbackMessage(type, description, email, title, files),
        SendgridAPI.sendFeedbackMessage(type, description, email, title, files),
      ]);
    } catch {
      return response.status(400).send();
    }

    response.status(200).send();
  }
}

export = CGPFeedbackController;
