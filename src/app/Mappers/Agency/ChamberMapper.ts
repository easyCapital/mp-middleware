import { Chambers } from '@robinfinance/js-api';
import GenericMapper from '../GenericMapper';

const ChamberMapping = {
  '1': Chambers.CNCIF,
  '2': Chambers.CNCGP,
  '3': Chambers.ANACOFI,
  '4': Chambers.COMPAGNIE_DES_CGP,
};

class ChamberMapper extends GenericMapper<Chambers> {
  protected readonly mapping = ChamberMapping;
}

export default new ChamberMapper();
