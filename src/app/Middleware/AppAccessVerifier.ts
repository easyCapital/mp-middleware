import { Apps } from '../../types';
import { ForbiddenException } from '../Exceptions';

const ALLOWED_ORIGIN_PER_APP = {
  [Apps.MIEUXPLACER]: ['http://mif.mieuxplacer.local', 'http://mif.mieuxplacer.dev.robintech.co'],
};

class AppAccessVerifier {
  private async handle({ request }, next) {
    const app = request.header('MP-App');
    const origin = request.header('Origin');

    if (!app || !ALLOWED_ORIGIN_PER_APP[app] || !ALLOWED_ORIGIN_PER_APP[app].includes(origin)) {
      throw new ForbiddenException();
    }

    await next();
  }
}

export = AppAccessVerifier;
