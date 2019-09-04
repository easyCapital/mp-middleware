import {
  Step as StepInterface,
  Block as BlockInterface,
  Question as QuestionInterface,
} from 'mieuxplacer-js-api';

import { Step, Question } from '../../../Models/Onboarding';

const BackendClient = use('BackendClient');

export default async function getOnboarding() {
  const steps: StepInterface[] = [];
  const blocks: { [key: string]: BlockInterface } = {};
  const questionKeys: string[] = [];
  const questions: { [key: string]: QuestionInterface } = {};

  try {
    const stepResponse = await BackendClient.get({ url: 'step/search' });
    const data = await stepResponse.json();

    data.forEach(item => {
      const step = new Step(item);

      steps.push(step.toJson());
      step.getBlocks().forEach(block => {
        blocks[block.getId()] = block.toJson();

        const matches = block.getLabel().match(/\{([\s\S]+?)\}/g);

        if (matches) {
          matches.forEach(match => {
            questionKeys.push(match.replace(/\{|\}/g, ''));
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const stepResponse = await BackendClient.get({
      url: 'question/search',
      filters: { key__in: questionKeys },
    });
    const data = await stepResponse.json();

    data.forEach(item => {
      const question = new Question(item);

      if (questionKeys.includes(question.getId())) {
        const jsonQuestion = question.toJson();

        if (jsonQuestion) {
          questions[question.getId()] = jsonQuestion;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }

  return { steps, blocks, questions };
}
