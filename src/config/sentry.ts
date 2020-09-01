/*
|--------------------------------------------------------------------------
| Sentry Configuaration
|--------------------------------------------------------------------------
*/

// @ts-ignore
import packageJson from '../../package.json';

const Env = use('Env');

export = {
  dsn: Env.get('SENTRY_DSN'),

  environment: Env.get('SENTRY_ENVIRONMENT'),

  release: `middleware@${packageJson.version}`,

  options: {
    // captureUnhandledRejections: true
  },
};
