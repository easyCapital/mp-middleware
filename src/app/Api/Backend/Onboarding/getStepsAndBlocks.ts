import { Exception } from '../../../Exceptions';
import { Step, Block } from '../../../Models/Onboarding';
import BackendApi from '..';
import { Filters } from '@robinfinance/js-api';

export interface StepsAndBlocks {
  steps: Step[];
  blocks: { [key: string]: Block };
  questionKeys: string[];
}

export default async function getStepsAndBlocks(
  this: BackendApi,
  withAuthentication: boolean,
  configKey: string | undefined,
  ids?: string[],
): Promise<StepsAndBlocks> {
  const steps: Step[] = [];
  const blocks: { [key: string]: Block } = {};
  const questionKeys: string[] = [];

  const filters: Filters = {};

  if (configKey) {
    filters.config_key = configKey;
  }

  try {
    const stepResponse = await this.backendClient.get({ url: 'step/search', filters });

    const data = await stepResponse.json();

    data.forEach((item) => {
      const step = new Step(item, withAuthentication);

      steps.push(step);

      step.getBlocks().forEach((block) => {
        if (!ids || ids.includes(block.getId())) {
          blocks[block.getId()] = block;

          questionKeys.push(...block.getQuestions());
        }
      });
    });
  } catch (exception) {
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }

  return { questionKeys, steps, blocks };
}
