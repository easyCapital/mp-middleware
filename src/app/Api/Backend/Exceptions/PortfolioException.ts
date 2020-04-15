import { HttpException } from '@adonisjs/generic-exceptions';

import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';
import { Exception } from '../../../Exceptions';

const Logger = use('Logger');

export default class PortfolioException extends HttpException {
  constructor(errors: BackendError[]) {
    const portfolioErrors: string[][] = [];

    errors.forEach(error => {
      const errorMessage: string[] = [];

      Object.keys(error).forEach(errorKey => {
        switch (errorKey) {
          case BackendErrorTypes.InvalidPortfolioWeight:
            errorMessage.push("La somme des pondérations du portefeuille n'est pas égale à 100 %.");
            break;

          case BackendErrorTypes.InitialAmountTooLowError:
            errorMessage.push("Le montant de placement initial n'est pas atteint sur ce contrat.");
            break;

          case BackendErrorTypes.MinValueError:
            errorMessage.push(
              `Le montant de placement initial n'est pas atteint sur ce contrat (${error[errorKey].limit_value} €).`,
            );
            break;

          case BackendErrorTypes.InitialAmountTooHighError:
            errorMessage.push('Le montant de placement initial est trop élevé sur ce contrat.');
            break;

          case BackendErrorTypes.InconsistentContractInitialDepositError:
            errorMessage.push("Le montant total des fonds n'est pas égal au placement initial.");
            break;

          case BackendErrorTypes.ConstraintsError:
            errorMessage.push(
              `Les contraintes fournisseur suivantes ne sont pas respectées : ${error[errorKey].constraints.join(
                ', ',
              )}.`,
            );
            break;

          default:
            Logger.info('Missing Error mapping value in %s for %s', 'PortfolioException', errorKey);
            errorMessage.push(Exception.defaultMessage);
            break;
        }
      });

      portfolioErrors.push(errorMessage);
    });

    // @ts-ignore
    super(portfolioErrors, 400);
  }
}
