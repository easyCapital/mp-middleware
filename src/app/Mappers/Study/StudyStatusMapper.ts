import { StudyStatuses } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const StudyStatusMapping = {
  'in progress': StudyStatuses.IN_PROGRESS,
  archived: StudyStatuses.ARCHIVED,
};

class StudyStatusMapper extends GenericMapper<StudyStatuses> {
  protected readonly mapping = StudyStatusMapping;
}

export default new StudyStatusMapper();
