import { Block, Question } from '../../../Models/Onboarding';
import BackendApi from '..';

export default async function getBlocks(
  this: BackendApi,
  configKey: string | undefined,
  ids?: string[],
): Promise<{ blocks: { [key: string]: Block }; questions: { [key: string]: Question } }> {
  const { blocks, questionKeys } = await this.getStepsAndBlocks(false, configKey, ids);
  const questions = questionKeys && questionKeys.length > 0 ? await this.getQuestions(configKey, questionKeys) : {};
  return { blocks, questions };
}
