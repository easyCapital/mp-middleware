import { Context } from '../../../../../types';

class CGPAuthenticationController {
  public async login(ctx: Context) {
    const { email, password }: any = ctx.request.post();

    const data = await ctx.backendApi.loginCGP(email, password);

    ctx.updateToken({ cgpToken: data.token });
    ctx.session.clear();

    const cgp = await ctx.backendApi.getCGPDetails();

    ctx.response.status(200).send({ token: data.token, user: cgp });
  }
}

export = CGPAuthenticationController;
