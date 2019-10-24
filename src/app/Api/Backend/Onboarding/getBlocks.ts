import { Step, Block, Question } from '../../../Models/Onboarding';
import { Exception } from '../../../Exceptions';
import BackendApi from '..';

export default async function getBlocks(
  this: BackendApi,
  ids?: string[],
): Promise<{ blocks: { [key: string]: Block }; questions: { [key: string]: Question } }> {
  const blocks: { [key: string]: Block } = {};
  const questionKeys: string[] = [];
  const questions: { [key: string]: Question } = {};

  try {
    const stepResponse = await this.backendClient.get({ url: 'step/search' });
    const data = await stepResponse.json();

    data.forEach(item => {
      const step = new Step(item, false);

      step.getBlocks().forEach(block => {
        if (!ids || ids.includes(block.getId())) {
          blocks[block.getId()] = block;

          const matches = block.getLabel().match(/\{([\s\S]+?)\}/g);

          if (matches) {
            matches.forEach(match => {
              questionKeys.push(match.replace(/\{|\}/g, ''));
            });
          }
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
    if (typeof exception.json === 'function') {
      const error = await exception.json();

      throw new Exception(JSON.stringify(error));
    }

    throw new Exception(exception);
  }

  return { blocks, questions };
}
