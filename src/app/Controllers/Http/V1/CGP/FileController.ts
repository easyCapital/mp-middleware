import { Filters, FileDTO, File as JsonFileInterface, OrderBy, Answer, FileType } from '@robinfinance/js-api';

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

  public async getByStudy({ params, request, response, backendApi }: Context) {
    const { study } = params;
    const filters = request.input('filters') as Filters | undefined;
    const orderBy = request.input('orderBy') as OrderBy | undefined;
    const latestBy = request.input('latestBy') as string | undefined;

    const files = await backendApi.getCGPStudyFiles(study, filters, orderBy, latestBy);

    response.status(200).send(files);
  }

  public async getAllStudiesFiles({ params, request, response, backendApi }: Context) {
    const { customer } = params;
    const filters = request.input('filters') as Filters | undefined;
    const orderBy = request.input('orderBy') as OrderBy | undefined;
    const latestBy = request.input('latestBy') as string | undefined;

    const studyFilesList = await backendApi.getCGPAllStudyFiles(customer, filters, orderBy, latestBy);

    response.status(200).send(studyFilesList);
  }

  public async create({ params, request, response, backendApi }: Context) {
    const { customer, study } = params;
    const data = request.post() as FileDTO[];

    const errors: { key: FileType; error: string }[] = [];

    const files: (JsonFileInterface | undefined)[] = await Promise.all(
      data.map(async (file, index) => {
        try {
          if (file.data !== undefined && file.type) {
            const createdFile = await backendApi.createCGPCustomerFile(
              customer,
              study,
              file.type,
              file.data,
              file.id,
              file.signatureDate,
              file.contractId,
            );

            return createdFile.toJSON();
          }

          if (file.file) {
            await backendApi.linkCGPCustomerFile(study, file.file.id);

            return file.file;
          }
        } catch (exception) {
          if (file.type) {
            errors[index] = { key: file.type, error: exception.message };
          }
        }
      }),
    );

    if (errors.length > 0) {
      response.status(400).send(errors);
    } else {
      response.status(200).send(files);
    }
  }

  public async delete({ params, req, res, backendApi }: Context) {
    const { file, customer } = params;

    await backendApi.deleteCGPCustomerFile(req, res, file, customer);
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

  public async merge({ params, request, response, backendApi }: Context) {
    const { customer, study } = params;
    const { type, id, files } = request.post() as any;

    const file = await backendApi.mergeCGPCustomerFile(customer, study, type, id, files);

    response.status(200).send(file);
  }

  public async downloadContractFiles({ params, req, res, backendApi }: Context) {
    const { contract } = params;

    await backendApi.downloadCGPContractFiles(req, res, contract);
  }

  public async downloadStudyFiles({ params, req, res, backendApi }: Context) {
    const { study } = params;

    await backendApi.downloadCGPStudyFiles(req, res, study);
  }

  public async downloadTemplateFile({ params, req, res, backendApi }: any) {
    const { type } = params;

    await backendApi.downloadTemplateFile(req, res, type);
  }

  public async inpactedFiles({ params, request, response, backendApi }: Context) {
    const { customer, study, contract } = params;
    const answers = request.post() as Answer[];

    const files = await backendApi.getInpactedCustomerFiles(customer, study, answers, contract);

    response.status(200).send(files);
  }

  public async signatureUrl({ params, request, response, backendApi }: Context) {
    const { customer, file } = params;
    const { callback, type }: any = request.post();

    const data = await backendApi.getCGPFileSignatureUrl(customer, file, callback, type);

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

  public async sendSignature({ params, request, response, backendApi }: Context) {
    const { customer, file } = params;
    const body: any = request.post();

    try {
      const data = await backendApi.sendCGPCustomerSignature(customer, file, body);

      response.status(200).send(data);
    } catch (exception) {
      response.status(400).send({ error: exception.message });
    }
  }

  public async signing({ params, backendApi, response }: Context) {
    const { id } = params;

    const file = await backendApi.setCGPCustomerFileAsSigning(id);

    response.status(200).send(file);
  }

  public async cancelSignature({ params, backendApi, response }: Context) {
    const { id } = params;

    const file = await backendApi.cancelCGPCustomerFileSignature(id);

    response.status(200).send(file);
  }
}

export = CGPContractFileController;
