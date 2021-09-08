import { Filters, OrderBy } from '@robinfinance/js-api';

import { Study } from '../../../../Models/Study';
import { File } from '../../../../Models/File';
import { FileTypeMapper, FileStatusMapper } from '../../../../Mappers/File';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function getAllStudyFiles(
  this: BackendApi,
  customerId: string,
  filters?: Filters,
  orderBy?: OrderBy,
  latestBy?: string,
): Promise<{ [studyId: number]: File[] }> {
  let formattedFilters: Filters = { customer: customerId };

  if (filters) {
    if ('type' in filters) {
      if (Array.isArray(filters.type)) {
        formattedFilters.type__in = filters.type.map((type) => FileTypeMapper.reverseTransform(type));
      } else {
        formattedFilters.type = FileTypeMapper.reverseTransform(filters.type);
      }

      delete filters.type;
    }

    if ('status' in filters) {
      if (Array.isArray(filters.status)) {
        formattedFilters.status__in = filters.status.map((status) => FileStatusMapper.reverseTransform(status));
      } else {
        formattedFilters.status = FileStatusMapper.reverseTransform(filters.status);
      }

      delete filters.status;
    }

    formattedFilters = { ...formattedFilters, ...filters };
  }

  try {
    const studyList: Study[] = await this.getCGPCustomerStudies(customerId);

    const filesByStudy: { [studyId: number]: File[] } = {};

    const studyFiles = await Promise.all(
      studyList.map((study) => this.getCGPStudyFiles(study.getId(), filters, orderBy, latestBy)),
    );

    studyList.forEach((study, index) => {
      filesByStudy[study.getId()] = studyFiles[index];
    });

    return filesByStudy;
  } catch (exception: any) {
    throw new Exception(exception);
  }
}
