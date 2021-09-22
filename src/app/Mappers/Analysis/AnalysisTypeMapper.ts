import { AnalysisTypes, AnalysisType } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const AnalysisTypeMapping = {
  '0': AnalysisTypes.AUTOMATIC,
  '1': AnalysisTypes.MANUAL,
};

class AnalysisTypeMapper extends GenericMapper<AnalysisType> {
  protected readonly mapping = AnalysisTypeMapping;
}

export default new AnalysisTypeMapper();
