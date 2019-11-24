import { HttpException } from '@adonisjs/generic-exceptions';

import { BackendError, BackendErrorTypes } from '../../../Clients/Backend/types';
import { Exception, InvalidArgumentException } from '../../../Exceptions';

const Logger = use('Logger');

export default class PortfolioException extends HttpException {
  constructor(error: BackendError) {
    Object.keys(error).forEach(errorKey => {
      switch (errorKey) {
        case BackendErrorTypes.InitialAmountTooLowError:
          throw new InvalidArgumentException("Le montant de placement initial n'est pas atteint sur ce contrat.");

        case BackendErrorTypes.InitialAmountTooHighError:
          throw new InvalidArgumentException('Le montant de placement initial est trop élevé sur ce contrat.');

        case BackendErrorTypes.InconsistentContractInitialDepositError:
          throw new InvalidArgumentException("Le montant total des fonds n'est pas égal au placement initial.");

        case BackendErrorTypes.ConstraintsError:
          throw new InvalidArgumentException(
            `Les contraintes fournisseur suivantes ne sont pas respectées : ${error[errorKey].constraints.join(', ')}.`,
          );

        default:
          Logger.info('Missing Error mapping value in %s for %s', 'PortfolioException', errorKey);
          break;
      }
    });

    super(Exception.defaultMessage, 500);
  }
}
