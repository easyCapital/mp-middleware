import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';

const Config = use('Config');
const Logger = use('Logger');

export default class PortfolioException extends HttpException {
  constructor(errors: BackendError[]) {
    const environment = Config.get('sentry.environment');
    const portfolioErrors: { type?: BackendErrors; message: string }[][] = [];

    errors.forEach((error) => {
      const errorMessages: { type?: BackendErrors; message: string }[] = [];

      Object.keys(error).forEach((errorKey) => {
        switch (errorKey) {
          case BackendErrors.InvalidPortfolioWeight:
            errorMessages.push({
              type: BackendErrors.InvalidPortfolioWeight,
              message: "La somme des pondérations du portefeuille n'est pas égale à 100 %.",
            });
            break;

          case BackendErrors.InitialAmountTooLowError:
            errorMessages.push({
              type: BackendErrors.InitialAmountTooLowError,
              message: "Le montant de placement initial n'est pas atteint sur ce contrat.",
            });
            break;

          case BackendErrors.MinValueError:
            errorMessages.push({
              type: BackendErrors.MinValueError,
              message: `Le montant de placement initial n'est pas atteint sur ce contrat (${error[errorKey].limit_value} €).`,
            });
            break;

          case BackendErrors.InitialAmountTooHighError:
            errorMessages.push({
              type: BackendErrors.InitialAmountTooHighError,
              message: 'Le montant de placement initial est trop élevé sur ce contrat.',
            });
            break;

          case BackendErrors.InconsistentContractInitialDepositError:
            errorMessages.push({
              type: BackendErrors.InconsistentContractInitialDepositError,
              message: "Le montant total des fonds n'est pas égal au placement initial.",
            });
            break;

          case BackendErrors.ConstraintsError:
            errorMessages.push({
              type: BackendErrors.ConstraintsError,
              message: `Les contraintes fournisseur suivantes ne sont pas respectées : ${error[
                errorKey
              ].constraints.join(', ')}.`,
            });
            break;

          default:
            const errorMessage = `Missing Error mapping value in PortfolioException for ${errorKey}`;

            if (environment === 'staging' || environment === 'production') {
              const Sentry = use('Sentry');

              Sentry.captureMessage(errorMessage, {
                context: { error },
              });
            }

            Logger.info(errorMessage);

            errorMessages.push({ message: Exception.defaultMessage });
            break;
        }
      });

      portfolioErrors.push(errorMessages);
    });

    // @ts-ignore
    super(portfolioErrors, 400);
  }
}
