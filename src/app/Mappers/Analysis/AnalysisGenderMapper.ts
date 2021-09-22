import { Gender, Genders } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const AnalysisGenderMapping = {
  Féminin: Genders.FEMALE,
  Masculin: Genders.MALE,
};

class AnalysisGenderMapper extends GenericMapper<Gender> {
  protected readonly mapping = AnalysisGenderMapping;
}

export default new AnalysisGenderMapper();
