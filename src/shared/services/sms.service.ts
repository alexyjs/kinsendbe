/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TollFreeInstance } from 'twilio/lib/rest/api/v2010/account/availablePhoneNumber/tollFree';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import { ConfigService } from '../../configs/config.service';
import { BadRequestException } from '../../utils/exceptions/BadRequestException';
import { IllegalStateException } from '../../utils/exceptions/IllegalStateException';
import { RequestContext } from '../../utils/RequestContext';
import {
  availablePhoneNumberMockResponse,
  verifyInstaceMockResponse,
} from '../../modules/resource/mocks/twilio.mock';

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
    useMock?: boolean,
  ): Promise<VerificationInstance> {
    const { logger, correlationId } = context;

    try {
      logger.info('Request verify phone number');

      if (useMock) {
        logger.info({
          correlationId,
          message: 'Request verify phone number successful by mock',
          data: verifyInstaceMockResponse,
        });
        return verifyInstaceMockResponse;
      }

      const { twilioVerificationServiceSid } = this.configService;
      const result = await this.twilioClient.verify
        .services(twilioVerificationServiceSid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });

      logger.info({
        correlationId,
        message: 'Request verify phone number successful',
        data: result,
      });

      return result;
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
    useMock?: boolean,
  ): Promise<VerificationCheckInstance> {
    const { twilioVerificationServiceSid } = this.configService;
    const { logger, correlationId } = context;
    try {
      logger.info('Request confirm phone number');

      if (useMock) {
        logger.info({
          correlationId,
          message: 'Request confirm phone number successful by mock',
          data: verifyInstaceMockResponse,
        });
        return verifyInstaceMockResponse;
      }

      const result = await this.twilioClient.verify
        .services(twilioVerificationServiceSid)
        .verificationChecks.create({ to: phoneNumber, code: verificationCode });

      if (!result.valid || result.status !== 'approved') {
        throw new BadRequestException('Wrong code provided');
      }

      logger.info({
        correlationId,
        message: 'Request confirm phone number successful',
        data: result,
      });

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

  async availablePhoneNumberTollFree(
    context: RequestContext,
    location = 'US',
    limit = 20,
    useMock?: boolean,
  ): Promise<TollFreeInstance[]> {
    const { logger, correlationId } = context;
    try {
      logger.info('Request confirm phone number');
      if (useMock) {
        logger.info({
          correlationId,
          message: 'Request rent numbers successful by mock',
          data: [availablePhoneNumberMockResponse],
        });
        return [availablePhoneNumberMockResponse];
      }
      const result = await this.twilioClient
        .availablePhoneNumbers(location)
        .tollFree.list({ limit });

      logger.info({
        correlationId,
        message: 'Request rent numbers successful',
        data: result,
      });

      return result;
    } catch (error: unknown) {
      logger.error({
        correlationId,
        msg: 'Request rent numbers error',
        error,
      });
      throw new IllegalStateException('Request rent numbers error');
    }
  }

  async sendVitualCardToSubscriber(
    context: RequestContext,
    vCardUrl: string,
    from: string,
    to: string,
  ): Promise<string> {
    const { logger, correlationId } = context;
    try {
      logger.info('Request confirm phone number');
      console.log('vCardUrl :>> ', vCardUrl);

      const result = await this.twilioClient.messages.create({
        body: 'Hi there',
        from: '+19124204933',
        to: '+16502649680',
      });
      // .create({
      //   from '16502649680',
      //   mediaUrl: vCardUrl,
      //   to,
      // });
      console.log('result :>> ', result);
      return 'result';
    } catch (error: unknown) {
      console.log('error :>> ', error);
      logger.error({
        correlationId,
        message: 'Send VCard to subscriber fail!',
        error,
      });
      throw new IllegalStateException('Send VCard to subscriber fail!');
    }
  }
}
