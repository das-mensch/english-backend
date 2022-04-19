import { Application } from 'express';
import { checkSentence } from '../../service';

export const registerVersion1Routes = (app: Application): void => {
  app.post<'/v1/check', {}, string[], string>('/v1/check', (req, res) => {
    res.json(checkSentence(req.body));
  });
};
