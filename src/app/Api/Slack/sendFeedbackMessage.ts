import { format } from 'date-fns';
import { getFileTypeFromBase64 } from '@robinfinance/js-api';

const Env = use('Env');
const Config = use('Config');
const Drive = use('Drive');
const SlackClient = use('SlackClient');

async function sendFeedbackMessage(
  origin: string,
  type: string,
  description: string,
  email: string,
  agency?: string,
  title?: string,
  rawFiles?: string[],
  data?: { [key: string]: string },
): Promise<void> {
  const FEEDBACK_CHANNEL_ID = Env.get('SLACK_FEEDBACK_CHANNEL_ID');
  const files: string[] = [];

  if (rawFiles && rawFiles.length > 0) {
    for await (const [index, rawFile] of rawFiles.entries()) {
      const file = Buffer.from(rawFile, 'base64');
      const [, extension] = getFileTypeFromBase64(rawFile);
      const creationDate = format(new Date(), 'dd-MM-yyyy_hh-mm-ss');
      const fileName = `uploads/upload_${creationDate}-${index + 1}${extension}`;

      await Drive.put(fileName, file);

      files.push(fileName);
    }
  }

  if (FEEDBACK_CHANNEL_ID) {
    let text = `Une nouvelle demande a été envoyée par un CGP :\n  - *origine :* ${origin}\n  - *type :* ${type}\n  - *titre :* ${
      title || '-'
    }\n  - *description :* ${description}\n  - *email :* ${email}\n  - *agence :* ${agency || '-'}`;

    if (data) {
      Object.keys(data).forEach((key) => {
        text += `\n  - *${key} :* ${data[key]}`;
      });
    }

    const section: any = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    };

    if (files.length > 0) {
      files.forEach((item) => {
        section.text.text += `\n  - *image :* ${Config.get('app.url')}/${item}`;
      });

      const firstFile = files[0];

      section.accessory = {
        type: 'image',
        image_url: `${Config.get('app.url')}/${firstFile}`,
        alt_text: firstFile,
      };
    }

    await SlackClient.postMessage(FEEDBACK_CHANNEL_ID, 'Nouveau feedback envoyé par un CGP', [section]);
  }
}

export default sendFeedbackMessage;
