class EventEmitterController {
  public async stream({ source }) {
    source.send({}, 'openStream', 'openStream');
  }

  public async deploy({ source }) {
    source.send({}, 'deployEvent', 'deployEvent');
  }
}

export = EventEmitterController;
