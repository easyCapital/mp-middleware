import { AnalysisEntry as JsonAnalysisEntryInterface, Gender, AnalysisPersonType } from '@robinfinance/js-api';

import { AnalysisGenderMapper, AnalysisPersonTypeMapper } from '../../Mappers/Analysis';

interface AnalysisEntryInterface {
  toJSON(): JsonAnalysisEntryInterface;
}

enum Fields {
  PRENOM = 'PRENOM',
  ALIAS = 'ALIAS',
  SEXE = 'SEXE',
  DATE_DE_NAISSANCE = 'DATE_DE_NAISSANCE',
  LIEU_DE_NAISSANCE = 'LIEU_DE_NAISSANCE',
  TITRE = 'TITRE',
  MOTIFS = 'MOTIFS',
  FONDEMENT_JURIDIQUE = 'FONDEMENT_JURIDIQUE',
}

export default class AnalysisEntry implements AnalysisEntryInterface {
  private id: number;
  private personType?: AnalysisPersonType;
  private gender?: Gender;
  private firstName?: string;
  private lastName?: string;
  private dateOfBirth?: string;
  private cityOfBirth?: string;
  private countryOfBirth?: string;
  private title?: string;
  private motive?: string;

  constructor(json: any) {
    this.id = json.IdRegistre;
    this.personType = this.getPersonType(json);
    this.gender = this.getGender(json);
    this.lastName = this.getLastName(json);
    this.firstName = this.getFirstName(json);
    this.dateOfBirth = this.getDateOfBirth(json);
    this.cityOfBirth = this.getCityOfBirth(json);
    this.countryOfBirth = this.getCountryOfBirth(json);
    this.title = this.getTitle(json);
    this.motive = this.getMotive(json);
  }

  private getPersonType(json: any): AnalysisPersonType | undefined {
    if (json.Nature) {
      return AnalysisPersonTypeMapper.transformValue(json.Nature);
    }
  }

  private getGender(json: any): Gender | undefined {
    const data = json.RegistreDetail.find((element) => element.TypeChamp === Fields.SEXE);

    if (data?.Valeur[0]?.Sexe) {
      return AnalysisGenderMapper.transformValue(data?.Valeur[0]?.Sexe);
    }
  }

  private getLastName(json: any): string | undefined {
    return json.Nom;
  }

  private getFirstName(json: any): string | undefined {
    const data = json.RegistreDetail.find((element) => element.TypeChamp === Fields.PRENOM);

    if (data?.Valeur[0]?.Prenom) {
      return data.Valeur[0].Prenom;
    }
  }

  private getDateOfBirth(json: any): string | undefined {
    const data = json.RegistreDetail.find((element) => element.TypeChamp === Fields.DATE_DE_NAISSANCE);

    if (data?.Valeur[0]?.Jour && data?.Valeur[0]?.Mois && data?.Valeur[0]?.Annee) {
      const day = data?.Valeur[0]?.Jour;
      const month = data?.Valeur[0]?.Mois;
      const year = data?.Valeur[0]?.Annee;

      return `${day}/${month}/${year}`;
    }
  }

  private getCityOfBirth(json: any): string | undefined {
    const data = json.RegistreDetail.find((element) => element.TypeChamp === Fields.LIEU_DE_NAISSANCE);

    if (data?.Valeur[0]?.Lieu) {
      return data.Valeur[0].Lieu;
    }
  }

  private getCountryOfBirth(json: any): string | undefined {
    const data = json.RegistreDetail.find((element) => element.TypeChamp === Fields.LIEU_DE_NAISSANCE);

    if (data?.Valeur[0]?.Pays) {
      return data.Valeur[0].Pays;
    }
  }

  private getTitle(json: any): string | undefined {
    const data = json.RegistreDetail.find((element) => element.TypeChamp === Fields.TITRE);

    if (data?.Valeur[0]?.Titre) {
      return data.Valeur[0].Titre;
    }
  }

  private getMotive(json: any): string | undefined {
    const data = json.RegistreDetail.find((element) => element.TypeChamp === Fields.MOTIFS);

    if (data?.Valeur[0]?.Motifs) {
      return data.Valeur[0].Motifs;
    }
  }

  public toJSON(): JsonAnalysisEntryInterface {
    return {
      id: this.id,
      personType: this.personType,
      gender: this.gender,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      cityOfBirth: this.cityOfBirth,
      countryOfBirth: this.countryOfBirth,
      title: this.title,
      motive: this.motive,
    };
  }
}
