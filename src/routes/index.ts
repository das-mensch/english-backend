import { Application } from 'express';
import { registerVersion1Routes } from './v1';

export const registerRoutes = (app: Application): void => {
  registerVersion1Routes(app);
};
