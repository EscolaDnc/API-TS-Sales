import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
