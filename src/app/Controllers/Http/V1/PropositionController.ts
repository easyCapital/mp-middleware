import { Proposition } from '../../../Models/Proposition';
import { Context } from '../../../../types';
import { NotFoundException } from '../../../Exceptions';
import { onPropositionGeneration } from '../../../Listeners';
import { Proposition as JsonPropositionInterface } from '@robinfinance/js-api';
import { Question } from '../../../Models/Onboarding';

const twig = use('Twig');
const wkHtmlToPdf = use('WkHtmlToPdf');
const helpers = use('Helpers');

class PropositionController {
  public async get({ response, session, authenticated, backendApi }: Context) {
    let proposition: Proposition | undefined;

    if (authenticated) {
      proposition = await backendApi.getLastProposition();
    } else {
      const token = session.get('lastPropositionToken');

      if (token) {
        proposition = await backendApi.getPropositionByToken(token);
      }
    }

    if (!proposition) {
      throw new NotFoundException('Aucune proposition trouvée.');
    }

    response.status(200).send(proposition);
  }

  public async getByToken({ params, response, backendApi }: Context) {
    const { token } = params;
    const proposition = await backendApi.getPropositionByToken(token);

    response.status(200).send(proposition);
  }

  public async generate(context: Context) {
    const { request, response, authenticated, backendApi, universe } = context;
    let proposition: Proposition;

    if (authenticated) {
      proposition = await backendApi.generateProposition(universe);
    } else {
      const { answers, prospectId }: any = request.post();

      proposition = await backendApi.generateProspectProposition(universe, prospectId, answers);
    }

    await onPropositionGeneration(context, proposition.getToken());

    response.status(200).send(proposition);
  }

  public async validate({ request, response, backendApi }: Context) {
    const { proposition }: any = request.post();

    await backendApi.validateProposition(proposition);

    response.status(200).send();
  }

  public async downloadByToken({ params, response, backendApi, universe }: Context) {
    const { token } = params;
    const proposition = await backendApi.getPropositionByToken(token);
    const questions = await backendApi.getQuestions(proposition.configKey, ['sub_contract_goal1', 'sub_horizon1']);
    const htmlContent = await twig.renderTemplate(
      'proposition/body.html',
      toTwigModel(proposition, universe, questions),
    );
    const footerContent = await twig.renderTemplate('proposition/footer.html', { page: '[page]' });
    const cssPath = `${helpers.resourcesPath()}/css/proposition/bundle.css`;
    const pdf = await wkHtmlToPdf.convert(htmlContent, {
      footer: footerContent,
      'margin-top': 8,
      'margin-bottom': 14,
      'margin-right': 0,
      'margin-left': 0,
      'internal-links': true,
      'user-style-sheet': cssPath,
    });
    response.type('application/pdf').send(pdf);
  }
}

function toTwigModel(proposition: Proposition, universe: string | undefined, questions: { [key: string]: Question }) {
  const recommendation = proposition.toJSON();
  const goals = findGoalsLabels(recommendation, questions);
  const horizon = findOptionLabel(questions, 'sub_horizon1', recommendation.answers.sub_horizon1 as string);
  return { recommendation, universe, goals, horizon };
}

function findGoalsLabels(recommendation: JsonPropositionInterface, questions: { [key: string]: Question }) {
  let goalsValues = recommendation.answers.sub_contract_goal1;
  if (goalsValues) {
    if (!Array.isArray(goalsValues)) {
      goalsValues = [goalsValues];
    }
    return goalsValues.map((optionValue: string) => findOptionLabel(questions, 'sub_contract_goal1', optionValue));
  }
}

function findOptionLabel(
  questions: { [key: string]: Question },
  questionKey: string,
  optionValue: string,
): string | undefined {
  const option = questions[questionKey].findOption(optionValue);
  if (option) {
    return option.label;
  }
}

export = PropositionController;
