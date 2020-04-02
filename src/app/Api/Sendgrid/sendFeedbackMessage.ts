const Env = use('Env');
const SendgridClient = use('SendgridClient');
const twig = use('Twig');

async function sendFeedbackMessage(
  type: string,
  description: string,
  email: string,
  title?: string,
  files?: string[],
): Promise<void> {
  const FEEDBACK_MAIL_DESTINATION = Env.get('FEEDBACK_MAIL_DESTINATION') as string;

  if (FEEDBACK_MAIL_DESTINATION) {
    const message = await twig.renderTemplate('mail/feedback.html', { type, title: title || '-', description, email });

    await SendgridClient.send(
      FEEDBACK_MAIL_DESTINATION,
      'hello@mieuxplacer.com',
      'Une nouvelle demande a été envoyée par un CGP',
      message,
      files,
    );
  }
}

export default sendFeedbackMessage;
