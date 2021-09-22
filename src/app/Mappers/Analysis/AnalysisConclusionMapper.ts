import { AnalysisConclusions, AnalysisConclusion } from '@robinfinance/js-api';

import GenericMapper from '../GenericMapper';

const AnalysisConclusionMapping = {
  '0': AnalysisConclusions.NOT_IN_BLACKLIST,
  '1': AnalysisConclusions.IN_BLACKLIST,
};

class AnalysisConclusionMapper extends GenericMapper<AnalysisConclusion> {
  protected readonly mapping = AnalysisConclusionMapping;
}

export default new AnalysisConclusionMapper();
