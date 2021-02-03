const Env = use('Env');
const SlackClient = use('SlackClient');

async function sendOtherProductName(
  origin: string,
  email: string,
  productName: string,
  agency?: string,
): Promise<void> {
  const PRODUCT_CHANNEL_ID = Env.get('SLACK_PRODUCT_CHANNEL_ID');

  if (PRODUCT_CHANNEL_ID) {
    const text: string = `Une sélection sans produit Elwin a été faite par un CGP :\n  - *origine :* ${origin}\n  - *email :* ${email}\n  - *agence :* ${
      agency || '-'
    }\n  - *produit :* ${productName}`;

    const section: any = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    };

    await SlackClient.postMessage(PRODUCT_CHANNEL_ID, [section]);
  }
}

export default sendOtherProductName;
