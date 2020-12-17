import Route from '@ioc:Adonis/Core/Route';
import HealthCheck from '@ioc:Adonis/Core/HealthCheck';

import { NotFoundException } from 'App/Exceptions';

import './cgp';

Route.get('api/health', async ({ response }) => {
  const report = await HealthCheck.getReport();

  return report.healthy ? response.ok(report) : response.badRequest(report);
});

Route.any('*', async ({ request, response }) => {
  const bestFormat = request.accepts(['json', 'html']);

  if (bestFormat === 'json') {
    throw new NotFoundException('Cette route est introuvable.');
  }

  response.redirect('https://elwin.fr/');
});
