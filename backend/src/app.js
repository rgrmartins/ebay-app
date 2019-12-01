import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    // instanciando os métodos
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  // Middleware de tratamento de erros
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // Só retorna em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

export default new App().server;
