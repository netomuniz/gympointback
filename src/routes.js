import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderQuestionController from './app/controllers/HelpOrderQuestionController';
import HelpOrderAnswerController from './app/controllers/HelpOrderAnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Student
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post('/students/:id/help-orders', HelpOrderQuestionController.store);
routes.get('/students/:id/help-orders', HelpOrderQuestionController.index);

routes.post('/sessions', SessionController.store);

// Middleware Auttentication whith Token
routes.use(authMiddleware);

// ADM
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
routes.get('/plans', PlanController.index);

routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.show);

routes.post('/students/:id/answers', HelpOrderAnswerController.store);
routes.get('/students/help-orders', HelpOrderAnswerController.index);

export default routes;
