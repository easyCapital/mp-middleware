import { Genders, Gender } from 'mieuxplacer-js-api';

const Logger = use('Logger');

enum GenderMapping {
  'masculin' = Genders.MALE,
  'féminin' = Genders.FEMALE,
}

export default class GenderMapper {
  public static transformValue(value: string): Gender | null {
    const mappedValue = GenderMapping[value];

    if (mappedValue) {
      return mappedValue;
    }

    Logger.info('Missing mapping value in %s for %s', 'GenderMapper', value);

    return null;
  }
}
