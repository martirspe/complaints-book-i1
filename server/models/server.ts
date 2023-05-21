import express, { Application } from 'express';
import claimRoutes from '../routes/claimRoute';
import userRoutes from '../routes/userRoute';
import db from '../db/connection';
import cors from 'cors';

import './claimModel';
import './detalleReclamoModel';
import './tipoBienModel';
import './tipoReclamoModel';
import './tipoUsuarioModel';
import './userModel';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    claims: '/api/claims',
    users: '/api/users'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      await db.sync();
      // await db.sync({ force: true });
      console.log('Database online.');
    } catch (error) {
      throw new Error('Failed to connect to the database.');
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Body reading
    this.app.use(express.json());
    // Public source
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.claims, claimRoutes),
    this.app.use(this.apiPaths.users, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server on port', this.port);
    });
  }
}

export default Server;
