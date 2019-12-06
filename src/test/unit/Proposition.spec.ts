import { ioc } from '@adonisjs/fold';
import { Suite } from '../../../typings/@adonisjs';
import { Proposition, Portfolio, Fund } from '../../app/Models/Proposition';
const { test }: Suite = ioc.use('Test/Suite')('Proposition');

test('validate proposition amount and portfolio weigth', async ({ assert }) => {
  const proposition = new Proposition({ id: 3 });
  proposition.addPortfolio(new Portfolio({ amount: 40 }));
  proposition.addPortfolio(new Portfolio({ amount: 60 }));

  const jsonProposition = proposition.toJSON();

  assert.equal(jsonProposition.id, 3);
  assert.equal(jsonProposition.amount, 100);
  assert.equal(jsonProposition.portfolios[0].weight, 0.4);
  assert.equal(jsonProposition.portfolios[1].weight, 0.6);
});

test('validate portfolio guaranteed capital weigth', async ({ assert }) => {
  const portfolio = new Portfolio({ amount: 40 });
  const scpiFund = new Fund({ line_type: '5' });
  scpiFund.setWeight(0.2);
  portfolio.addFund(scpiFund);
  const euroFund = new Fund({ line_type: '3' });
  euroFund.setWeight(0.8);
  portfolio.addFund(euroFund);

  const jsonPortfolio = portfolio.toJSON();

  assert.equal(jsonPortfolio.guaranteedCapitalWeight, 0.8);
});
