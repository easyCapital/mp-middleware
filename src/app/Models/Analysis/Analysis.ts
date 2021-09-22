import { Analysis as JsonAnalysisInterface, AnalysisType, AnalysisConclusion } from '@robinfinance/js-api';

import { AnalysisTypeMapper, AnalysisConclusionMapper } from '../../Mappers/Analysis';
import { AnalysisEntry } from '.';

interface AnalysisInterface {
  toJSON(): JsonAnalysisInterface;
}

export default class Analysis implements AnalysisInterface {
  id: number;
  type?: AnalysisType;
  conclusion?: AnalysisConclusion;
  customerId: number;
  fileId: number;
  comment?: string;
  entries: AnalysisEntry[];
  created: string;

  constructor(json: any) {
    this.id = json.id;
    this.type = AnalysisTypeMapper.transformValue(json.analysis_type);
    this.conclusion = AnalysisConclusionMapper.transformValue(json.analysis_conclusion);

    this.customerId = json.user;
    this.fileId = json.report_file;

    this.comment = json.comment;
    this.entries = json.data.map((entry) => new AnalysisEntry(entry));

    this.created = json.created;
  }

  public toJSON(): JsonAnalysisInterface {
    return {
      id: this.id,
      type: this.type,
      conclusion: this.conclusion,
      customerId: this.customerId,
      fileId: this.fileId,
      comment: this.comment,
      entries: this.entries.map((entry) => entry.toJSON()),
      created: this.created,
    };
  }
}
