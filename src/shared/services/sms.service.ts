/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '../../configs/config.service';
import { BadRequestException } from '../../utils/exceptions/BadRequestException';
import { IllegalStateException } from '../../utils/exceptions/IllegalStateException';
import { RequestContext } from '../../utils/RequestContext';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const { twilioAccountSid, twilioAuthToken } = this.configService;
    this.twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);
  }

  async initiatePhoneNumberVerification(
    context: RequestContext,
    phoneNumber: string,
  ): Promise<unknown> {
    const { logger, correlationId } = context;

    try {
      logger.info('Request verify phone number');

      const { twilioVerificationServiceSid } = this.configService;
      const response = await this.twilioClient.verify
        .services(twilioVerificationServiceSid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });

      logger.info('Request verify phone number successfully');

      return response;
    } catch (error: unknown) {
      logger.error({
        correlationId,
        message: 'Request verify phone number error',
        error,
      });
      throw new IllegalStateException('Request verify phone number not success');
    }
  }

  async confirmPhoneNumber(
    context: RequestContext,
    phoneNumber: string,
    verificationCode: string,
  ): Promise<unknown> {
    const { twilioVerificationServiceSid } = this.configService;
    const { logger, correlationId } = context;
    try {
      logger.info('Request confirm phone number');

      const result = await this.twilioClient.verify
        .services(twilioVerificationServiceSid)
        .verificationChecks.create({ to: phoneNumber, code: verificationCode });

      if (!result.valid || result.status !== 'approved') {
        throw new BadRequestException('Wrong code provided');
      }

      logger.info('Request confirm phone number successfully');

      return result;
    } catch (error: unknown) {
      logger.error({
        correlationId,
        message: 'Request confirm phone number error',
        error,
      });
      throw new IllegalStateException('Request confirm phone number not success');
    }
  }
}