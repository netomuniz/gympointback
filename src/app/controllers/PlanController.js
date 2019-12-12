import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title } = req.body;

    const planExists = await Plan.findOne({ where: { title } });

    if (planExists) {
      return res.status(400).json({ erro: 'Plan  already exists' });
    }

    const { id, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plans = await Plan.findByPk(req.params.id);

    await plans.update(req.body);

    return res.json(plans);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    plan.canceled_at = new Date();

    return res.send(plan);
  }

  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }
}

export default new PlanController();
