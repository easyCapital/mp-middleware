import { Filters, OrderBy, Pagination } from '@robinfinance/js-api';
import { Context } from '../../../../../types';

class CGPUserController {
  public async get({ response, backendApi }: Context): Promise<void> {
    const customer = await backendApi.getCGPDetails();

    response.status(200).send(customer);
  }

  public async getTags({ request, response, backendApi }: Context): Promise<void> {
    const pagination = request.input('pagination') as Pagination;
    const filters = request.input('filters') as Filters;
    const orderBy = request.input('orderBy') as OrderBy;

    const tags = await backendApi.getCGPTags(pagination, filters, orderBy);

    response.status(200).send(tags);
  }

  public async getStatistics({ response, backendApi }: Context): Promise<void> {
    const statistics = await backendApi.getCGPStatistics();

    response.status(200).send(statistics);
  }

  public async setHasSeenHelp({ response, backendApi }: Context): Promise<void> {
    const customer = await backendApi.setCGHasSeenHelp();

    response.status(200).send(customer);
  }

  public async changePassword({ request, response, backendApi }: Context): Promise<void> {
    const { oldPassword, newPassword }: any = request.post();

    await backendApi.modifyCGPPassword(oldPassword, newPassword);

    response.status(200).send();
  }

  public async changeSignature({ request, response, backendApi }: Context): Promise<void> {
    const { signature }: any = request.post();

    const user = await backendApi.modifyCGPSignature(signature);

    response.status(200).send(user);
  }

  public async stripePortal({ response, backendApi }: Context): Promise<void> {
    const url = await backendApi.getCGPStripePortalUrl();

    response.redirect(url);
  }
}

export = CGPUserController;
