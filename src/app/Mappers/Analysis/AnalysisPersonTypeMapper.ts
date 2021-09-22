import { AnalysisPersonType, AnalysisPersonTypes } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const AnalysisPersonTypeMapping = {
  'Personne physique': AnalysisPersonTypes.NATURAL,
  'Personne morale': AnalysisPersonTypes.LEGAL,
};

class AnalysisPersonTypeMapper extends GenericMapper<AnalysisPersonType> {
  protected readonly mapping = AnalysisPersonTypeMapping;
}

export default new AnalysisPersonTypeMapper();
