import { Context } from '../../../types';
import { Proposition } from '../../Models/Proposition';

async function onPropositionGeneration(context: Context, proposition: Proposition) {
  const { session, authenticated, symfonyApi } = context;

  if (!authenticated) {
    session.put('lastPropositionToken', proposition.getToken());
  }

  let investmentAmount: string | undefined;

  proposition.getAnswers().forEach(answer => {
    if (answer.getKey() === 'sub_investment_amount1') {
      investmentAmount = answer.getValue() as string;
    }
  });

  if (proposition.getPortfolios().length > 0 && investmentAmount && Number(investmentAmount) < 500000) {
    symfonyApi.sendPropositionByEmail(proposition.getToken());
  }
}

export default onPropositionGeneration;
