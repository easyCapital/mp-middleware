import { Step, Block, Question } from '../../../Models/Onboarding';
import BackendException from '../Exceptions/BackendException';
import BackendApi from '..';

export default async function getOnboarding(
  this: BackendApi,
  withAuthentication: boolean,
): Promise<{ steps: Step[]; blocks: { [key: string]: Block }; questions: { [key: string]: Question } }> {
  const steps: Step[] = [];
  const blocks: { [key: string]: Block } = {};
  const questionKeys: string[] = [];
  const questions: { [key: string]: Question } = {};

  try {
    const stepResponse = await this.backendClient.get({ url: 'step/search' });
    const data = await stepResponse.json();

    data.forEach(item => {
      const step = new Step(item, withAuthentication);

      steps.push(step);
      step.getBlocks().forEach(block => {
        blocks[block.getId()] = block;

        const matches = block.getLabel().match(/\{([\s\S]+?)\}/g);

        if (matches) {
          matches.forEach(match => {
            questionKeys.push(match.replace(/\{|\}/g, ''));
          });
        }
      });
    });
  } catch (exception) {
    throw new BackendException(exception);
  }

  try {
    const stepResponse = await this.backendClient.get({
      url: 'question/search',
      filters: { key__in: questionKeys },
    });
    const data = await stepResponse.json();

    data.forEach(item => {
      const question = new Question(item);

      if (questionKeys.includes(question.getId())) {
        questions[question.getId()] = question;
      }
    });
  } catch (exception) {
    throw new BackendException(exception);
  }

  return { steps, blocks, questions };
}
