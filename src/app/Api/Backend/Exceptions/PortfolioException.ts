import { HttpException } from '@adonisjs/generic-exceptions';
import { BackendError, BackendErrors } from '@robinfinance/js-api';

import { Exception } from '../../../Exceptions';

const Logger = use('Logger');

export default class PortfolioException extends HttpException {
  constructor(errors: BackendError[]) {
    const portfolioErrors: { type?: BackendErrors; message: string }[][] = [];

    errors.forEach((error) => {
      const errorMessage: { type?: BackendErrors; message: string }[] = [];

      Object.keys(error).forEach((errorKey) => {
        switch (errorKey) {
          case BackendErrors.InvalidPortfolioWeight:
            errorMessage.push({
              type: BackendErrors.InvalidPortfolioWeight,
              message: "La somme des pondérations du portefeuille n'est pas égale à 100 %.",
            });
            break;

          case BackendErrors.InitialAmountTooLowError:
            errorMessage.push({
              type: BackendErrors.InitialAmountTooLowError,
              message: "Le montant de placement initial n'est pas atteint sur ce contrat.",
            });
            break;

          case BackendErrors.MinValueError:
            errorMessage.push({
              type: BackendErrors.MinValueError,
              message: `Le montant de placement initial n'est pas atteint sur ce contrat (${error[errorKey].limit_value} €).`,
            });
            break;

          case BackendErrors.InitialAmountTooHighError:
            errorMessage.push({
              type: BackendErrors.InitialAmountTooHighError,
              message: 'Le montant de placement initial est trop élevé sur ce contrat.',
            });
            break;

          case BackendErrors.InconsistentContractInitialDepositError:
            errorMessage.push({
              type: BackendErrors.InconsistentContractInitialDepositError,
              message: "Le montant total des fonds n'est pas égal au placement initial.",
            });
            break;

          case BackendErrors.ConstraintsError:
            errorMessage.push({
              type: BackendErrors.ConstraintsError,
              message: `Les contraintes fournisseur suivantes ne sont pas respectées : ${error[
                errorKey
              ].constraints.join(', ')}.`,
            });
            break;

          default:
            Logger.info('Missing Error mapping value in %s for %s', 'PortfolioException', errorKey);
            errorMessage.push({ message: Exception.defaultMessage });
            break;
        }
      });

      portfolioErrors.push(errorMessage);
    });

    // @ts-ignore
    super(portfolioErrors, 400);
  }
}
