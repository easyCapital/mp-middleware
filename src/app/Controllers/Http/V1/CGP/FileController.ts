import {
  Filters,
  FileDTO,
  File as JsonFileInterface,
  OrderBy,
  Answer,
  FileType,
  Pagination,
} from '@robinfinance/js-api';

import { Context } from '../../../../../types';

class CGPFileController {
  public async search({ request, response, backendApi }: Context): Promise<void> {
    const filters = request.input('filters') as Filters | undefined;
    const orderBy = request.input('orderBy') as OrderBy | undefined;
    const latestBy = request.input('latestBy') as string | undefined;

    const files = await backendApi.getCustomerFiles(filters, orderBy, latestBy);

    response.status(200).send(files);
  }

  public async getByStudy({ params, request, response, backendApi }: Context): Promise<void> {
    const { study } = params;
    const filters = request.input('filters') as Filters | undefined;
    const orderBy = request.input('orderBy') as OrderBy | undefined;
    const latestBy = request.input('latestBy') as string | undefined;

    const files = await backendApi.getCGPStudyFiles(study, filters, orderBy, latestBy);

    response.status(200).send(files);
  }

  public async getAllStudiesFiles({ params, request, response, backendApi }: Context): Promise<void> {
    const { household } = params;
    const filters = request.input('filters') as Filters | undefined;
    const orderBy = request.input('orderBy') as OrderBy | undefined;
    const latestBy = request.input('latestBy') as string | undefined;

    const studyFilesList = await backendApi.getCGPAllStudyFiles(household, filters, orderBy, latestBy);

    response.status(200).send(studyFilesList);
  }

  public async create({ params, request, response, backendApi }: Context): Promise<void> {
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
              file.name,
              file.order,
            );

            return createdFile.toJSON();
          }

          if (file.file) {
            await backendApi.linkCGPCustomerFile(study, file.file.id);

            return file.file;
          }
        } catch (exception: any) {
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

  public async delete({ params, req, res, backendApi }: Context): Promise<void> {
    const { file, customer } = params;

    await backendApi.deleteCGPCustomerFile(req, res, file, customer);
  }

  public async view({ params, req, res, backendApi }: Context): Promise<void> {
    const { id } = params;

    await backendApi.downloadCGPCustomerFile(req, res, id);
  }

  public async generate({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study } = params;
    const data = request.post() as any;

    const files = await backendApi.generateCGPCustomerFiles(customer, study, data);

    response.status(200).send(files);
  }

  public async download({ params, request, req, res, backendApi }: Context): Promise<void> {
    const { id } = params;
    const type = request.input('type') as string;

    await backendApi.downloadCGPCustomerFile(req, res, id, type);
  }

  public async merge({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer, study } = params;
    const { type, id, files } = request.post() as any;

    const file = await backendApi.mergeCGPCustomerFile(customer, study, type, id, files);

    response.status(200).send(file);
  }

  public async downloadContractFiles({ params, req, res, backendApi }: Context): Promise<void> {
    const { contract } = params;

    await backendApi.downloadCGPContractFiles(req, res, contract);
  }

  public async downloadStudyFiles({ params, req, res, backendApi }: Context): Promise<void> {
    const { study } = params;

    await backendApi.downloadCGPStudyFiles(req, res, study);
  }

  public async downloadTemplateFile({ params, req, request, res, backendApi }: Context): Promise<void> {
    const { type } = params;
    const fileFormat = request.input('fileFormat');

    await backendApi.downloadTemplateFile(req, res, type, fileFormat);
  }

  public async inpactedFiles({ params, request, response, backendApi }: Context): Promise<void> {
    const { study, contract } = params;
    const answers = request.post() as Answer[];

    const files = await backendApi.getInpactedFiles(study, answers, contract);

    response.status(200).send(files);
  }

  public async signature({ params, request, response, backendApi }: Context): Promise<void> {
    const { id } = params;
    const data = request.all() as { callback?: string };

    const signature = await backendApi.getFileSignature(id, data.callback);

    if (signature) {
      response.status(200).send(signature);
    } else {
      response.status(204).send();
    }
  }

  public async signatureDetails({ request, response, backendApi }: Context): Promise<void> {
    const pagination = request.input('pagination') as Pagination;
    const filters = request.input('filters') as Filters;
    const orderBy = request.input('orderBy') as OrderBy;

    const files = await backendApi.getCGPSignatureDetails(pagination, filters, orderBy);

    response.status(200).send(files);
  }

  public async generateSignature({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer } = params;
    const { files, callback, type, sendFilesToClient }: any = request.post();

    const data = await backendApi.signCustomerFiles(customer, files, callback, type, sendFilesToClient);

    response.status(200).send(data);
  }

  public async sendSignature({ request, response, backendApi }: Context): Promise<void> {
    const { files, customers, subject, message, sendFilesToClient }: any = request.post();

    const data = await backendApi.sendCGPCustomerSignature(files, customers, subject, message, sendFilesToClient);

    response.status(200).send(data);
  }

  public async signing({ params, backendApi, response }: Context): Promise<void> {
    const { id } = params;

    const file = await backendApi.setCGPCustomerFileAsSigning(id);

    response.status(200).send(file);
  }

  public async cancelSignature({ params, backendApi, response }: Context): Promise<void> {
    const { id } = params;

    const file = await backendApi.cancelCGPCustomerFileSignature(id);

    response.status(200).send(file);
  }

  public async archived({ params, request, response, backendApi }: Context): Promise<void> {
    const { customer } = params;
    const { files: fileIds }: any = request.post();

    const files = await backendApi.setCGPCustomerFilesAsArchived(customer, fileIds);

    response.status(200).send(files);
  }

  public async questions({ params, backendApi, response }: Context): Promise<void> {
    const { customer, study, contract, fileType } = params;

    const questions = await backendApi.getFileQuestions(customer, fileType, study, contract);

    response.status(200).send(questions);
  }

  public async bulkUpdate({ params, request, backendApi, response }: Context): Promise<void> {
    const { customer, study } = params;

    const files = request.post() as { id: number; order: number; name: string }[];

    const updatedFiles = await backendApi.updateCGPStudyFiles(customer, study, files);

    response.status(200).send(updatedFiles);
  }
}

export = CGPFileController;
