import { Proposition, Fund, Portfolio } from '../../../Models/Proposition';
import { Exception } from '../../../Exceptions';

const BackendClient = use('BackendClient');

export default async function getPropositionByToken(token: string) {
  try {
    const response = await BackendClient.get({ url: `proposition/get/token/${token}` });
    const data = await response.json();

    const proposition = new Proposition(data);

    if (data.contents.length > 0) {
      for (const jsonPortfolio of data.contents) {
        const portfolio = new Portfolio(jsonPortfolio);
        try {
          const portfolioResponse = await BackendClient.get({
            url: 'portfolio/search',
            filters: { id: portfolio.getId() },
          });
          const portfolioData = await portfolioResponse.json();

          if (portfolioData.length > 0) {
            const portfolioLines = portfolioData[0].lines;
            const lineIds = portfolioLines.map(item => item.line);

            try {
              const lineResponse = await BackendClient.get({
                url: 'line/search',
                filters: { id__in: lineIds },
              });
              const lineData = await lineResponse.json();

              if (lineData.length > 0) {
                lineData.forEach(line => {
                  const fund = new Fund(line);
                  const portfolioLine = portfolioLines.find(item => item.line === fund.getId());

                  if (portfolioLine) {
                    fund.setWeight(portfolioLine.weight);
                  }

                  portfolio.addFund(fund);
                });
              }

              proposition.addPortfolio(portfolio);
            } catch (error) {
              throw new Exception(error);
            }
          }
        } catch (error) {
          throw new Exception(error);
        }
      }
    }

    return proposition.toJson();
  } catch (error) {
    throw new Exception(error);
  }
}
