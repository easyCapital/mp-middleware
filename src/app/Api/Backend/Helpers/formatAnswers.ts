import { QuestionAnswer as JsonAnswer } from '@robinfinance/js-api';

import { Answer } from '../../../Models/Answer';

function formatAnswers(answers: Answer[]): JsonAnswer {
  const formattedAnswers: JsonAnswer = {};

  answers.forEach((answer) => {
    formattedAnswers[answer.getKey()] = answer.getValue();
  });

  return formattedAnswers;
}

export default formatAnswers;
