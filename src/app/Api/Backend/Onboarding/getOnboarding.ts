import { Step, Block, Question } from '../../../Models/Onboarding';
import BackendApi from '..';

export default async function getOnboarding(
  this: BackendApi,
  withAuthentication: boolean,
  configKey: string | undefined,
): Promise<{ steps: Step[]; blocks: { [key: string]: Block }; questions: { [key: string]: Question } }> {
  const { questionKeys, steps, blocks } = await this.getStepsAndBlocks(withAuthentication, configKey);
  const questions = await this.getQuestions(configKey, questionKeys);
  return { steps, blocks, questions };
}
