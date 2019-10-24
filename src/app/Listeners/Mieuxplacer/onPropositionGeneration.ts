import { Context } from '../../../types';

async function onPropositionGeneration(context: Context, token: string) {
  const { session, authenticated, symfonyApi } = context;

  if (!authenticated) {
    session.put('lastPropositionToken', token);
  }

  symfonyApi.sendPropositionByEmail(token);
}

export default onPropositionGeneration;
