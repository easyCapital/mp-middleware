import { ElasticIndex, ElasticIndexInterface, JsonIndexInterface } from '../../Clients/Elastic/ElasticIndex';

interface JsonCustomerIndexInterface extends JsonIndexInterface {
  body: {
    app: string;
    source?: string;
    campaign?: string;
    medium?: string;
    universe: string;
  };
}

class CustomerIndex extends ElasticIndex implements ElasticIndexInterface {
  private app: string;
  private source?: string;
  private campaign?: string;
  private medium?: string;
  private universe: string;

  constructor(json: any) {
    super(json.id, json.type, json.index);
    this.app = json.app;
    this.source = json.source;
    this.campaign = json.campaign;
    this.medium = json.medium;
    this.universe = json.universe;
  }

  public toJSON(): JsonCustomerIndexInterface {
    return {
      index: this.index,
      type: this.type,
      id: String(this.id),
      body: {
        app: this.app,
        source: this.source,
        campaign: this.campaign,
        medium: this.medium,
        universe: this.universe,
      },
    };
  }
}

export default CustomerIndex;
