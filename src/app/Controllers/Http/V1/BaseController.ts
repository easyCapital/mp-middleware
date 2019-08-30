class BaseController {
  private index({ response }) {
    response.send('hello world');
  }
}

export = BaseController;
