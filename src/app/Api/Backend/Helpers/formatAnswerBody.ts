import { QuestionAnswer } from '@robinfinance/js-api';

function formatAnswerBody(answers: QuestionAnswer): { question: string; value: string | null }[] {
  const formattedAnswers: { question: string; value: string | null }[] = [];

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
