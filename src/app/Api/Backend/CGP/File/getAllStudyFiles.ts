import { Filters, OrderBy } from '@robinfinance/js-api';

import { Study } from '../../../../Models/Study';
import { File } from '../../../../Models/File';
import { FileTypeMapper, FileStatusMapper } from '../../../../Mappers/File';
import { Exception } from '../../../../Exceptions';
import BackendApi from '../..';

export default async function getAllStudyFiles(
  this: BackendApi,
  householdId: number | string,
  filters?: Filters,
  orderBy?: OrderBy,
  latestBy?: string,
): Promise<{ study: Study; files: File[] }[]> {
  let formattedFilters: Filters = {};

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
    const studies = await this.getHouseholdStudies(householdId);

    const studyFiles = await Promise.all(
      studies.map((study) => this.getCGPStudyFiles(study.getId(), filters, orderBy, latestBy)),
    );

    return studies.map((study, index) => ({
      study,
      files: studyFiles[index],
    }));
  } catch (exception: any) {
    throw new Exception(exception);
  }
}
