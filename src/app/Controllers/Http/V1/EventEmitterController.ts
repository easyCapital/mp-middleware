import { Context } from '../../../../types';

class EventEmitterController {
  public async stream({ source }: Context): Promise<void> {
    source.send({}, 'openStream', 'openStream');
  }

  public async deploy({ source }: Context): Promise<void> {
    source.send({}, 'deployEvent', 'deployEvent');
  }
}

export = EventEmitterController;
