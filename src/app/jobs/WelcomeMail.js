import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { student, plan, start_date, end_date, price } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Seja Bem Vindo, seu plano foi ativado!',
      template: 'welcome',
      context: {
        student: student.name,
        plan: plan.title,
        start: format(parseISO(start_date), "dd'/'MM'/'YYY", {
          locale: pt
        }),
        end: format(parseISO(end_date), "dd'/'MM'/'YYY", {
          locale: pt
        }),
        price: `R$${price}`
      }
    });
  }
}

export default new WelcomeMail();
