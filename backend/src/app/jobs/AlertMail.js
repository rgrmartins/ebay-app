import Mail from '../../lib/Mail';

class AlertMail {
  get key() {
    return 'AlertMail';
  }

  async handle({ data }) {
    const { name, email } = data;

    // Sending Email to Customer
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'New survey performed',
      template: 'products',
      context: {
        Client: name,
      },
    });
  }
}

export default new AlertMail();
