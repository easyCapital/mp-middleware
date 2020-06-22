import { ObservationCategories } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const ObservationCategoryMapping = {
  '0': ObservationCategories.TAX,
  '1': ObservationCategories.SUCCESSION,
  '2': ObservationCategories.FAMILY,
  '3': ObservationCategories.WEALTH,
  '4': ObservationCategories.INCOME,
  '5': ObservationCategories.MARITAL_STATUS,
  '6': ObservationCategories.CAPITAL_CREATION,
  '7': ObservationCategories.RETIREMENT,
  '8': ObservationCategories.SAVINGS,
  '9': ObservationCategories.EXPENSES,
  '10': ObservationCategories.REAL_ESTATE,
  '11': ObservationCategories.OTHER,
};

class ObservationCategoryMapper extends GenericMapper<ObservationCategories> {
  protected readonly mapping = ObservationCategoryMapping;
}

export default new ObservationCategoryMapper();
