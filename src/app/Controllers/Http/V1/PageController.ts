import * as PrismicApi from '../../../Api/Prismic';

class PageController {
  public async index({ response }) {
    const data = await PrismicApi.getPages();

    response.status(200).send(data);
  }

  public async get({ params, response }) {
    const { slug } = params;

    const data = await PrismicApi.getPage(slug);

    response.status(200).send(data);
  }

  public async search({ request, response }) {
    const filters = request.input('filters');

    const data = await PrismicApi.findPages(filters);

    response.status(200).send(data);
  }
}

export = PageController;
