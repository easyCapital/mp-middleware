const Env = use('Env');
const SlackClient = use('SlackClient');

async function sendOtherProductOrSupplierName(
  origin: string,
  email: string,
  supplierName: string,
  productName?: string,
  agency?: string,
): Promise<void> {
  const PRODUCT_CHANNEL_ID = Env.get('SLACK_PRODUCT_CHANNEL_ID');

  if (PRODUCT_CHANNEL_ID) {
    const text = `Demande d'ajout de fournisseur ou de produit par un CGP :\n  - *origine :* ${origin}\n  - *email :* ${email}\n  - *agence :* ${
      agency || '-'
    }\n  - *fournisseur :* ${supplierName} - \n  - *produit(s) :* ${productName}`;

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

export default sendOtherProductOrSupplierName;
