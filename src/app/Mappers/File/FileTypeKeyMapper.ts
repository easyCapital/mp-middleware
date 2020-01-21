import GenericMapper from '../GenericMapper';

const FileTypeKeyMapping = {
  unknown: '0',
  id: '1',
  passport: '2',
  home_certificate: '3',
  supplier_contract: '4',
  direct_debit_authorization: '5',
  rib: '6',
  id_verso: '7',
  face: '8',
  credit_card: '9',
  taxe: '10',
  mission_order: '11',
  mission_report: '12',
  host_id: '13',
  host_id_verso: '14',
  host_hebergement_certificat: '15',
  sub_pea_portfolio: '16',
  der: '17',
};

class FileTypeKeyMapper extends GenericMapper<string> {
  protected readonly mapping = FileTypeKeyMapping;
}

export default new FileTypeKeyMapper();
