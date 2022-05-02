import { Step, Block } from '../../../Models/Onboarding';
import { Exception } from '../../../Exceptions';
import { BackendException } from '../Exceptions';
import BackendApi from '..';

export default async function getQuestionnaire(
  this: BackendApi,
  key: string,
): Promise<{ steps: Step[]; blocks: { [key: string]: Block } }> {
  try {
    const response = await this.backendClient.get({
      url: 'step/search',
      filters: { config_key: key },
    });

    const data = await response.json();

    const steps: Step[] = [];
    const blocks: { [key: string]: Block } = {};

    data.forEach((item) => {
      steps.push(new Step(item));

      item.blocks.forEach((block) => {
        blocks[block.id] = new Block(block);
      });
    });

    return { steps, blocks };
  } catch (exception: any) {
    if (exception instanceof Response && typeof exception.json === 'function') {
      const error = await exception.json();

      throw new BackendException(error);
    }

    throw new Exception(exception);
  }
}
