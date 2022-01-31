import { Block } from '../../../../Models/Onboarding';
import { Exception } from '../../../../Exceptions';
import { BackendException } from '../../Exceptions';
import BackendApi from '../..';

export default async function getForm(this: BackendApi, key: string): Promise<Block[]> {
  try {
    const response = await this.backendClient.get({
      url: 'step/search',
      filters: { config_key: key },
    });

    const data = await response.json();

    const blocks: Block[] = [];

    data.forEach((item) => {
      blocks.push(...item.blocks.map((block) => new Block(block)));
    });

    return blocks;
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
