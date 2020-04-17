import { ContractStatuses } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const ContractStatusMapping = {
  '0': ContractStatuses.PENDING,
  '1': ContractStatuses.PENDING,
  '2': ContractStatuses.OPEN,
  '3': ContractStatuses.PENDING,
  '4': ContractStatuses.PENDING,
  '5': ContractStatuses.PENDING,
  '10': ContractStatuses.CLOSED,
};

class ContractStatusMapper extends GenericMapper<ContractStatuses> {
  protected readonly mapping = ContractStatusMapping;
}

export default new ContractStatusMapper();
