import { Context } from '../../../../../types';

class CGPMissionReportController {
  public async download({ params, req, res, backendApi }: Context) {
    const { token } = params;

    await backendApi.downloadCGPMissionReport(req, res, token);
  }
}

export = CGPMissionReportController;
