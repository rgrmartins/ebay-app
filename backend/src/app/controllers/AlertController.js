import * as Yup from 'yup';
import { addJob, removeJob } from '../jobs/cron';
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
      email: req.body.email,
      search_phrase: req.body.search_phrase,
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
    const alerts = await Alert.find().sort({ createdAt: 'desc' });

    return res.json(alerts);
  }

  async delete(req, res) {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    removeJob(alert);
    return res.json(alert);
  }

  async update(req, res) {
    // input validation
    const schema = Yup.object().shape({
      name: Yup.string(),
      search_phrase: Yup.string(),
      email: Yup.string().email(),
      research_time: Yup.number(),
    });

    // input validation
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { name, search_phrase, email, research_time } = req.body;

    const alerts = await Alert.findByIdAndUpdate(req.params.id, {
      name,
      search_phrase,
      email,
      research_time,
    });
    return res.json(alerts);
  }
}

export default new AlertController();
