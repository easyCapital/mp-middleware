import { Filters, FileType } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { File } from '../../../../Models/File';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPContractFileController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    let filters = request.input('filters') as Filters;

    filters = customer ? { ...filters, user: customer } : { ...filters };

    const files = await backendApi.getCGPCustomerFiles(filters);

    response.status(200).send(files);
  }

  public async download({ params, req, res, backendApi }: Context) {
    const { id } = params;

    await backendApi.downloadCGPCustomerFile(req, res, id);
  }

  public async downloadTemplate({ params, req, res, backendApi }: Context) {
    const { type } = params;

    await backendApi.downloadCGPTemplateFile(req, res, type);
  }

  public async create({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const data: any = request.post();

    const files: File[] = [];
    const errors = {};

    for await (const key of Object.keys(data)) {
      try {
        const file = await backendApi.createCGPCustomerFile(customer, key as FileType, data[key]);

        files.push(file);
      } catch (exception) {
        errors[key] = exception.message;
      }
    }

    if (Object.keys(errors).length > 0) {
      response.status(400).send(errors);
    } else {
      response.status(200).send(files);
    }
  }

  public async signatureUrl({ params, response, backendApi, app, origin }: Context) {
    const { customer, type } = params;

    const callbackUrl = app.signatureCallback
      ? origin + app.signatureCallback.interpolate({ customer, type })
      : undefined;

    if (!callbackUrl) {
      throw new InvalidArgumentException("Aucune URL de callback n'a été fourni.");
    }

    const url = await backendApi.getCGPFileSignatureUrl(customer, type, callbackUrl);

    response.status(200).send(url);
  }

  public async signed({ params, backendApi, response }: Context) {
    const { id } = params;

    const file = await backendApi.signedCGPCustomerFile(id);

    response.status(200).send(file);
  }
}

export = CGPContractFileController;
