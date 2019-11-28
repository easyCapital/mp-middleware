import { Genders } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const GenderMapping = {
  masculin: Genders.MALE,
  féminin: Genders.FEMALE,
};

class GenderMapper extends GenericMapper<Genders> {
  protected readonly mapping = GenderMapping;
}

export default new GenderMapper();
