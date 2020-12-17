import { Genders } from '@robinfinance/elwin-js';

import GenericMapper from '../GenericMapper';

const CGPGenderMapping = {
  '1': Genders.FEMALE,
  '2': Genders.MALE,
};

class CGPGenderMapper extends GenericMapper<Genders> {
  protected readonly mapping = CGPGenderMapping;
}

export default new CGPGenderMapper();
