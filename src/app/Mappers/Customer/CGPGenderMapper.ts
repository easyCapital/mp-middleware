import { Genders } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const CGPGenderMapping = {
  '1': Genders.FEMALE,
  '2': Genders.MALE,
};

class CGPGenderMapper extends GenericMapper<Genders> {
  protected readonly mapping = CGPGenderMapping;
}

export default new CGPGenderMapper();
