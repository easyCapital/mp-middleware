import { Step, Block, Question } from '../../../Models/Onboarding';
import BackendApi from '..';

export default async function getOnboarding(
  this: BackendApi,
  withAuthentication: boolean,
  stepsConfig: string | undefined,
  questionsConfig: string | undefined,
): Promise<{ steps: Step[]; blocks: { [key: string]: Block }; questions: { [key: string]: Question } }> {
  const { questionKeys, steps, blocks } = await this.getStepsAndBlocks(withAuthentication, stepsConfig);

  const questions = await this.getQuestions(questionsConfig, questionKeys);

  return { steps, blocks, questions };
}
