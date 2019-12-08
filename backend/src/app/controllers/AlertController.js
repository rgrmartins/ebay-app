import * as Yup from 'yup';
import { addJob } from '../jobs/cron';
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
      where: { email: req.body.email, search_phrase: req.body.search_phrase },
    });

    if (checkSearchExists) {
      return res
        .status(401)
        .json({ error: 'This survey has already been created by this email.' });
    }

    const { name, search_phrase, email, research_time } = req.body;

    // save search and trigger API and email
    const alert = await Alert.create({
      name,
      search_phrase,
      email,
      research_time,
    });

    // Create a new CronJob
    addJob(alert);

    return res.json(alert);
  }

  async index(req, res) {
    return res.json({
      teste: 'TESTE',
    });
  }
}

export default new AlertController();
