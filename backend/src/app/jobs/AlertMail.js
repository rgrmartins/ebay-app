import Mail from '../../lib/Mail';

class AlertMail {
  get key() {
    return 'AlertMail';
  }

  async handle({ data }) {
    const { name, email, productsFinal, search_phrase } = data;
    // Sending Email to Customer
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'New survey performed',
      template: 'products',
      context: {
        client: name,
        email,
        phrase: search_phrase,
        products: productsFinal,
      },
    });
  }
}

export default new AlertMail();
