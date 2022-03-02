import { AgencyDTO } from '@robinfinance/js-api';

import { Agency } from '../../../../Models/Agency';
import { Exception, FileTooBigException } from '../../../../Exceptions';
import { FileException } from '../../Exceptions';
import BackendApi from '../..';

export default async function editAgency(this: BackendApi, agencyDTO: AgencyDTO): Promise<Agency> {
  try {
    const response = await this.backendClient.patch(
      {
        url: 'cgp/agency/',
      },
      agencyDTO,
    );

    const data = await response.json();

    const agency = new Agency(data);

    return agency;
  } catch (exception: any) {
    if (exception.status === 413) {
      throw new FileTooBigException();
    }

    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new FileException(error, 'JPG, JPEG et PNG');
    }

    throw new Exception(exception);
  }
}
