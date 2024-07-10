import AppError from '@shared/errors/AppError';
import { userRepository } from '../database/repositories/UserRepositories';
import { userTokensRepository } from '../database/repositories/UserTokensRepositories';
import { sendEmail } from '@config/email';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not exists.', 404);
    }

    const token = await userTokensRepository.generate(user.id);

    sendEmail({
      to: email,
      subject: 'My Sales Recovery Password',
      body: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center; border: 2px solid #041d40; border-radius: 10px; margin: auto; width: 60%;">
          <h1 style="color: #041d40;">Password Reset Verification Code</h1>
          <h3 style="color: #041d40;">Dear ${user.name},</h3>
          <p style="font-size: 16px; color: #333;">Recover your password with this token:</p>
          <p>
            <strong style="border: 2px dashed #041d40; padding: 10px; border-radius: 5px; font-size: 16px; color: #041d40;">${token?.token}</strong>
          </p>
          <p style="margin-top: 20px;">Best regards,<br><span style="font-weight: bold; color: #041d40;">My Sales Staff</span></p>
        </div>
      `,
    });
  }
}

export default SendForgotPasswordEmailService;
