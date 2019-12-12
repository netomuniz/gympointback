import { subDays, isAfter } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;
    const checkins = await Checkin.findAll({ where: { student_id: id } });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const isStudentAble = await Enrollment.findOne({
      where: { student_id: id }
    });

    if (!isStudentAble || !isAfter(isStudentAble.end_date, new Date())) {
      return res
        .status(401)
        .json({ error: 'Your enrollment is not able to send help orders' });
    }

    const now = new Date();
    const oneWeekAgo = subDays(now, 7);

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [oneWeekAgo, now]
        }
      }
    });

    if (checkins.length === 5) {
      return res
        .status(401)
        .json({ error: 'You already trained 5 times this week' });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.json(checkin);
  }
}

export default new CheckinController();
