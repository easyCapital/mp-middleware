import { File } from '../../../../Models/File';
import { Exception } from '../../../../Exceptions';

import BackendApi from '../..';

export default async function updateStudyFiles(
  this: BackendApi,
  customer: number,
  study: number,
  files: { id: number; order: number; name?: string }[],
): Promise<File[]> {
  try {
    const response = await this.backendClient.post(
      {
        url: `cgp/customer/${customer}/study/${study}/files/bulk_update`,
      },
      files,
    );

    const data = await response.json();

    const updatedFiles = data.map((file) => new File(file));

    return updatedFiles;
  } catch (exception: any) {
    throw new Exception(exception);
  }
}
