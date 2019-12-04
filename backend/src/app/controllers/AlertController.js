import * as Yup from 'yup';
import CronJob from 'cron';
import Alert from '../schemas/Alert';

class AlertController {
  async store(req, res) {
    // input validation
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      search_phrase: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      research_time: Yup.number().required(),
    });

    // input validation
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    // checking if search already exists for this email
    const checkSearchExists = await Alert.findOne({
      where: { email: req.body.email, searc_phrase: req.body.search_phrase },
    });

    if (checkSearchExists) {
      return res
        .status(401)
        .json({ error: 'This survey has already been created by this email.' });
    }

    const { name, search_phrase, email, research_time } = req.body;

    // save search and trigger API and email
    await Alert.create(name, search_phrase, email, research_time);

    // Create a new CronJob
    const job = new CronJob(
      `*/${research_time} * * * *`,
      () => {
        console.log(`Running a new CronJob for ${search_phrase}`);
        // Aqui chamará a API e fará a busca dos produtos e retornará os 3 mais baratos
      },
      null,
      true,
      'America/Sao_paulo'
    );

    return res.json(job);
  }

  async index(req, res) {
    return res.json({
      teste: 'TESTE',
    });
  }
}

export default new AlertController();
