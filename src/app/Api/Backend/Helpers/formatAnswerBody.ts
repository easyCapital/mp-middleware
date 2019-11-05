import { Answer } from '@robinfinance/js-api';

function formatAnswerBody(answers: Answer): { question: string; value: string }[] {
  const formattedAnswers: { question: string; value: string }[] = [];

  Object.keys(answers).forEach(key => {
    const answer = answers[key];

    if (Array.isArray(answer)) {
      answer.forEach(item => {
        formattedAnswers.push({ question: key, value: item });
      });
    } else {
      formattedAnswers.push({ question: key, value: answer });
    }
  });

  return formattedAnswers;
}

export default formatAnswerBody;
