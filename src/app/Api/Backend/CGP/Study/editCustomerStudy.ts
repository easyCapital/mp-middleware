import { StudyDTO } from '@robinfinance/js-api';

import { StudyStatusMapper } from '../../../../Mappers/Study';
import { Study } from '../../../../Models/Study';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function editCustomerStudy(
  this: BackendApi,
  customerId: string,
  studyId: string,
  studyData: StudyDTO,
): Promise<Study> {
  const formattedStudy: { title?: string; status?: string } = {};

  if (studyData.title !== undefined) {
    formattedStudy.title = studyData.title;
  }

  if (studyData.status !== undefined) {
    formattedStudy.status = StudyStatusMapper.reverseTransform(studyData.status);
  }

  try {
    const response = await this.backendClient.patch(
      {
        url: `cgp/customer/${customerId}/study/${studyId}/update`,
      },
      formattedStudy,
    );

    const data = await response.json();
    const updatedStudy = new Study(data);

    return updatedStudy;
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const errors = await exception.json();

      throw new BackendException(errors);
    }

    throw new Exception(exception);
  }
}
