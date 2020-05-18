import { Filters, FileType, FileDTO, File as JsonFileInterface, OrderBy, QuestionAnswer } from '@robinfinance/js-api';

import { Context } from '../../../../../types';
import { InvalidArgumentException } from '../../../../Exceptions';

class CGPContractFileController {
  public async search({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters | undefined;
    const orderBy = request.input('orderBy') as OrderBy | undefined;
    const latestBy = request.input('latestBy') as string | undefined;

    const files = await backendApi.getCGPCustomerFiles(customer, filters, orderBy, latestBy);

    response.status(200).send(files);
  }

  public async create({ params, request, response, backendApi }: Context) {
    const { customer, study } = params;
    const data = request.post() as FileDTO;

    const files: JsonFileInterface[] = [];
    const errors = {};

    for await (const key of Object.keys(data)) {
      const file = data[key];

      try {
        if (file.data) {
          const createdFile = await backendApi.createCGPCustomerFile(
            customer,
            study,
            key as FileType,
            file.data,
            file.signatureDate,
            file.contractId,
          );

          files.push(createdFile.toJSON());
        } else if (file.file) {
          await backendApi.linkCGPCustomerFile(study, file.file.id);

          files.push(file.file);
        }
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

  public async view({ params, req, res, backendApi }: Context) {
    const { id } = params;

    await backendApi.downloadCGPCustomerFile(req, res, id);
  }

  public async generate({ params, request, response, backendApi }: Context) {
    const { customer, study } = params;
    const data = request.post() as any;

    const files = await backendApi.generateCGPCustomerFiles(customer, study, data);

    response.status(200).send(files);
  }

  public async download({ params, request, req, res, backendApi }: Context) {
    const { id } = params;
    const type = request.input('type') as string;

    await backendApi.downloadCGPCustomerFile(req, res, id, type);
  }

  public async downloadContractFiles({ params, req, res, backendApi }: Context) {
    const { contract } = params;

    await backendApi.downloadCGPContractFiles(req, res, contract);
  }

  public async inpactedFiles({ params, request, response, backendApi }: Context) {
    const { customer, study, contract } = params;
    const answers = request.post() as QuestionAnswer;

    const files = await backendApi.getInpactedCustomerFiles(customer, study, answers, contract);

    response.status(200).send(files);
  }

  public async signatureUrl({ params, response, backendApi, app, origin }: Context) {
    const { customer, file } = params;

    const callbackUrl = app.signatureCallback
      ? origin + app.signatureCallback.interpolate({ customer, file })
      : undefined;

    if (!callbackUrl) {
      throw new InvalidArgumentException("Aucune URL de callback n'a été fourni.");
    }

    const data = await backendApi.getCGPFileSignatureUrl(customer, file, callbackUrl);

    response.status(200).send(data);
  }

  public async sign({ params, request, response, backendApi, app, origin }: Context) {
    const { customer, file } = params;
    const { callback }: any = request.get();

    const callbackUrl =
      callback || (app.signatureCallback ? origin + app.signatureCallback.interpolate({ customer, file }) : undefined);

    if (!callbackUrl) {
      throw new InvalidArgumentException("Aucune URL de callback n'a été fourni.");
    }

    const data = await backendApi.getCGPFileSignatureUrl(customer, file, callbackUrl);

    response.redirect(data.url);
  }

  public async signed({ params, backendApi, response }: Context) {
    const { id } = params;

    const file = await backendApi.signedCGPCustomerFile(id);

    response.status(200).send(file);
  }
}

export = CGPContractFileController;
